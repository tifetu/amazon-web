import React, { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import classes from "./cart.module.css";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
function Cart() {
  const [state, dispatch] = useContext(DataContext);
  const cartItems = state.basket || [];
  // calculate subtotal
  const subtotal = cartItems.reduce((amount, item) => {
    return amount + item.price * item.amount;
  }, 0);
  // Increment amount
  const Increment = (item) => {
    dispatch({ type: Type.ADD_TO_BASKET, item });
  };
  const Decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };
  console.log(cartItems);
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your shoping basket</h3>
          <hr />
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item, id) => (
              <section key={id} className={classes.cart_product}>
                <ProductCard
                  key={id}
                  product={item}
                  renderDesc={true}
                  flex={true}
                  renderAdd={false}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                  
                  }}
                >
                  <button onClick={() => Increment(item) }>
                    <IoIosArrowUp size={25} />
                  </button>
                  <span>{item.amount}</span>
                  <button onClick={() => Decrement(item.id)}>
                    <IoIosArrowDown size={25}/>
                  </button>
                </div>
              </section>
            ))
          )}
        </div>
        {cartItems?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>subtotal ({cartItems.length} items)</p>
              <CurrencyFormat amount={subtotal} />
            </div>
            <span>
              <input type="checkbox" />
              <small>this order cantaines a gift</small>
            </span>
            <Link to="/payments">continue the chechout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
