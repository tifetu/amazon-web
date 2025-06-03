import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./product.module.css";
import Loader from "../Loader/Loader";
function Product() {
  const [product, setProducts] = useState([])
  const [isLoader, setLoaders] = useState(false);
  useEffect(() => {
    setLoaders(true);
    async function productData() {
      try {
        const res = await axios.get("https://fakestoreapi.com/products/");
        setProducts(res.data);
        setLoaders(false);
      } catch (error) {
        console.log(error);
        setLoaders(false);
      }
    }
    productData();
  }, []);
  return (
    <>
      {isLoader ? (
        <Loader />
      ) : (
        <section className={classes.products_container}>
          {product?.map((singleProduct) => {
            return (
              <ProductCard product={singleProduct} key={singleProduct.id} renderAdd={true}/>
            );
          })}
        </section>
      )}
    </>
  );
}

export default Product;
