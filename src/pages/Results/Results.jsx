import React, { useEffect } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useState } from "react";
import axios from "axios";
import { productUrl } from "../../Api/endPoint";
import { useParams } from "react-router-dom";
import ProductCard from "../../Components/Product/ProductCard";
import classes from "../../Components/Product/product.module.css";
function Results() {
  const { categoryName } = useParams();
  console.log(categoryName);
  const [prod, setResults] = useState([]);
  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        // console.log(res.data);
        setResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryName]);
  return (
    <LayOut>
      <section className={classes.results_container}>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/{categoryName}</p>
        <hr />
        <div className={classes.products_container}>
          {prod?.map((product) => {
            return (
              <ProductCard
                key={product.id}
                product={product}
                flex={false}
                renderAdd={true}
                renderDesc={false}
              />
            );
          })}
        </div>
      </section>
    </LayOut>
  );
}

export default Results;
