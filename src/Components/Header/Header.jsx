import React, { useContext } from "react";
import logo from "../../assets/images/amazon0logo.png";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import classes from "./header.module.css";
import { DataContext } from "../DataProvider/DataProvider";
import LowerHeader from "./LowerHeader";
import { auth } from "../../Utility/firebase";

function Header() {
  const nanigate = useNavigate();
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const sumofItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0); // console.log(basket)
  return (
    <>
      <section className={classes.fixed}>
        <section className={classes.header_container}>
          <div className={classes.logo_container}>
            {/* logo */}
            <Link to={"/"}>
              <img
                src={"https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"}
                alt=""
              />
            </Link>

            {/* delevery */}

            <Link to="/delivery">
              <div className={classes.delivery}>
                <span>
                  {/* icon */}
                  <SlLocationPin />
                </span>
                <div>
                  <p>Deliver to </p>
                  <span>Ethiopia</span>
                </div>
              </div>
            </Link>
          </div>
          {/* search */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" placeholder="search products" />
            <BsSearch style={{ fontSize: "38px" }} />
          </div>
          {/* right side link */}
          <div className={classes.order_container}>
            <Link to="/flag" className={classes.language}>
              <img
                src="https://i.ebayimg.com/images/g/0~gAAMXQ9qpRTk04/s-l1600.webp"
                alt=""
              />
              <select>
                <option value="">En</option>
              </select>
            </Link>
            {/* three components */}
            <Link to={!user && "/signup"}>
              <div>
                {user ? (
                  <>
                    <p>Hello, {user?.email?.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}>sign out</span>
                  </>
                ) : (
                  <>
                    <p>sign in</p>
                    <span>Account & lists</span>
                  </>
                )}
              </div>
            </Link>
            {/* orders */}
            <Link to="/orders">
              <p>returns</p>
              <span>& orders</span>
            </Link>
            {/* cart */}
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{sumofItem}</span>
            </Link>
          </div>
        </section>
        <LowerHeader />
      </section>
    </>
  );
}

export default Header;
