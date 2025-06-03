import React from 'react'
import {catagoryInfo} from './catagoryFullInfos'
import CatagoryCard from './CatagoryCard'
import classes from './catagory.module.css'
function Catagory() {
  return (
    <section className={classes.category_container}>
      {catagoryInfo?.map((info) => {
        return <CatagoryCard key={info.id} data={info} />;
      })}
    </section>
  );
}

export default Catagory