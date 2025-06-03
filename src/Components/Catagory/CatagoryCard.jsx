import React from "react";
import classes from "./catagory.module.css";
import { Link } from "react-router-dom";
function CatagoryCard({ data }) {
  console.log(data);
  return (
    <div className={classes.category}>
      <Link to={`/category/${data.category}`}>
        <span>
          <h2>{data?.category}</h2>
        </span>
        <img src={data?.image} alt="" />
        <p>shop now</p>
      </Link>
    </div>
  );
}

export default CatagoryCard;
