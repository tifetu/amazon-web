import { useEffect, useState, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import LayOut from "../../Components/LayOut/LayOut";
import ProductCard from "../../Components/Product/ProductCard";
// import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import classes from "./orders.module.css"; // create your own styles
import moment from "moment";
function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const ordersRef = collection(db, "users", user.uid, "orders");
          const snapshot = await getDocs(ordersRef);
          console.log(snapshot);
          const fetchedOrders = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));

          // Sort by newest order first

          fetchedOrders.sort((a, b) => b.created - a.created);
          setOrders(fetchedOrders);
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
          setLoading(false);
        }
      } else {
        setOrders([]);
      }
    };

    fetchOrders();
  }, []);

  return (
    <LayOut>
      <div className={classes.container}>
        <div className={classes.orders}>
          <h2>Your Orders</h2>
          {orders.length === 0 && <div>you don't have an order.</div>}

          <div>
            {orders?.map((order) => {
              return (
                <div key={order.id}>
                  <hr />
                  <p>Order ID : {order?.id}</p>
                  <p style={{color:"blue"}}>
                    Ordered Date:
                    {moment(order?.created?.toDate()).format(
                      "MMMM Do YYYY,h:mm A"
                    )}
                  </p>
                  {order?.data.basket?.map((orderItem) => {
                    return (
                      <ProductCard
                        product={orderItem}
                        key={orderItem.id}
                        flex={true}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </LayOut>
  );
}

export default Orders;
