import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Required for styles
import { bannerImages } from "./img"; // Your image data
import classes from "./carousel.module.css";
const CarouselEffect = () => {
  return (
    <div>
      <Carousel className={classes.Carousel}
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {bannerImages?.map((imageUrl, index) => (
          <img src={imageUrl} alt={`Banner `} />
        ))}
      </Carousel>
      <div className={classes.img_info}></div>
    </div>
  );
};

export default CarouselEffect;
