import React, { useContext, useEffect, useState } from "react";
import CarouselComp from "../Carousel/CarouselComp";
import Spinner from "react-bootstrap/Spinner";

function HomeMainCarousel() {
  const [allPopular, setAllPopular] = useState([]);
  let [isLoading, setLoading] = useState("loading");
  const api_key = "6d12d8c51590cd478561b8c0d68dc184";
  const url = `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${api_key}`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAllPopular(data.results);
        setLoading("Loaded");
      })
      .catch((err) => setLoading("error"));
  }, []);
  let items = <CarouselComp items={allPopular} />;
  return (
    <div className="home-carousel-spinner">
      {isLoading === "loading" ? (
        <div className="spinner">
          <Spinner variant="white" />
        </div>
      ) : isLoading === "error" ? (
        <div className="error-message">
          <label>Network Problem</label>
        </div>
      ) : (
        <div id="home-carousel">{items}</div>
      )}
    </div>
  );
}

export default HomeMainCarousel;
