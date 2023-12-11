import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import HomeSliderComs from "./HomeSliderComs";
import HomeMainCarousel from "./HomeMainCarousel";

function Index() {
  // let items = allPopular.map((item) => {
  //   return (
  //     <>
  //       <div className="card">
  //         <img
  //           src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
  //           id={item.id}
  //         />
  //         <label htmlFor={item.id}>{item.title ? item.title : item.name}</label>
  //       </div>
  //     </>
  //   );
  // });

  return (
    <div id="main">
      <HomeMainCarousel />
      <HomeSliderComs />
    </div>
  );
}

export default Index;
