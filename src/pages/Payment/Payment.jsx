import React, { useState } from "react";
import { instance } from "../../Utility/axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./payment.module.css";
import { useContext } from "react";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import ClipLoader from "react-spinners/ClipLoader";
import { db } from "../../Utility/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";
function Payment() {
  const [cardError, setCardError] = useState("");
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const totalItems = basket.reduce((amount, item) => {
    return amount + item.amount;
  }, 0);
  const total = basket?.reduce((amount, item) => {
    return amount + item.price * item.amount;
  }, 0);

  const handleChange = (e) => {
    console.log(e);
    if (e.error) {
      setCardError(e?.error?.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 1.backend || functions ---> contact to the client secret
    try {
      setProcessing(true);
      const response = await instance({
        method: "POST",
        url: `/payment/create?total=${total}`,
      });
      console.log(response.data);
      const clientSecret = response.data.clientSecret;
      // 2.client side--->confirem the card payment

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // 3 database for firstore confirmation

      const orderRef = doc(db, "users", user?.uid, "orders", paymentIntent.id);
      await setDoc(orderRef, {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });
      dispatch({
        type: Type.CLEAR_BASKET,
      });
      console.log(paymentIntent);
      setProcessing(false);
      navigate("/orders");
    } catch (error) {
      console.log(error.message);
      setProcessing(false);
    }
  };
  return (
    <LayOut>
      <div className={classes.header_payment}>
        checkout ({totalItems}) items
      </div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>chicago IL</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => {
              return (
                <ProductCard
                  product={item}
                  key={item.id}
                  flex={true}
                  renderDesc={false}
                />
              );
            })}
          </div>
        </div>
        <hr />
        {/* price */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card}>
            <div className={classes.payment_details}>
              <form onSubmit={handleSubmit}>
                {cardError && <div style={{ color: "red" }}>{cardError}</div>}
                <CardElement onChange={handleChange} />
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      Total Order | <CurrencyFormat amount={total} />{" "}
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>please wait</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <hr />
    </LayOut>
  );
}

export default Payment;
