import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import classes from "./product.module.css";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { DataContext } from "../DataProvider/DataProvider";
function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const { image, title, id, rating, price, description } = product;
  const [state, dispatch] = useContext(DataContext);
  // console.log(state)
  const addtocart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, description, id, rating, price },
    });
  };
  return (
    <div
      className={[
        classes.card_container,
        flex ? classes.product_flexed : "",
      ].join(" ")}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={product?.name} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}
        <div className={classes.rating}>
          {/* rating */}
          <Rating value={rating?.rate} precision={0.1} />
          {/* count */}
          <small>{rating?.count}</small>
        </div>
        <div className={classes.price}>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addtocart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
