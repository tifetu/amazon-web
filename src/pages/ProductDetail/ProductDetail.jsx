import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import axios from "axios";
import { useParams } from "react-router-dom";
import { productUrl } from "../../Api/endPoint";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";
function ProductDetail() {
  const { productId } = useParams();
  const [product, setProducts] = useState({});
  const [isLoader, setLoaders] = useState(false);
  useEffect(() => {
    setLoaders(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        console.log(res);
        setProducts(res.data);
        setLoaders(false);
      })
      .catch((err) => {
        console.log(err);
        setLoaders(false);
      });
  }, []);
  return (
    <LayOut>{isLoader ? <Loader /> : <ProductCard product={product} flex={true} renderDesc={true} renderAdd={true}/>}</LayOut>
  );
}

export default ProductDetail;
