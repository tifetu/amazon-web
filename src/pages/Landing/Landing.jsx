import React from "react";
import LayOut from "../../Components/LayOut/LayOut";
import CarouselEffect from "../../Components/Carousel/CarouselEffect";
import Catagory from "../../Components/Catagory/Catagory";
import Product from "../../Components/Product/Product";
function Landing() {
  return (
    <LayOut>
      <CarouselEffect />
      <Catagory />
      <Product />
    </LayOut>
  );
}

export default Landing;
