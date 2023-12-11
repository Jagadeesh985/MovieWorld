import React, { useEffect, useState } from "react";
import {
  FaAngleDoubleRight,
  FaCalendar,
  FaPlay,
  FaStar,
  FaVideo,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Slider from "react-slick";
// import "./test.css";
import { NavLink } from "react-router-dom";

function Test() {
  let [popularShows, setPopularShows] = useState([]);
  let [displayDetails, setDisplayDetails] = useState("");
  let [popUpclass, setPopUpClass] = useState("");
  let url =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=6d12d8c51590cd478561b8c0d68dc184";
  useEffect(() => {
    if (popularShows.length === 0) {
      const fetchData = async () => {
        //   console.log("Rendering");
        const response = await fetch(url);
        const data = await response.json();
        setPopularShows(data.results);
      };
      fetchData();
    }
  }, []);
  const minToHoursDuration = (time) => {
    let hrs = time / 60;
    let mins = time % 60;
    return Math.floor(hrs) + "hr:" + mins + "min";
  };

  const itemsToRender = popularShows.map((item) => {
    return (
      <div className="card-slider-card">
        <div className="movietv-slider-card">
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            id={item.id}
            alt={item.title ? item.title : item.name}
          />
          <label htmlFor={item.id}>{item.title ? item.title : item.name}</label>
        </div>
        <div className="movietv-slider-card-details">
          <label>{item.title ? item.title : item.name}</label>
          <label>
            <FaStar />
            {item.vote_average}&nbsp;&nbsp;
            <FaCalendar />
            {item.release_date}&nbsp;&nbsp;
            {item.media_type ? item.media_type.toUpprtCase() : "MOVIE"}
          </label>
          <label className="overview-label">
            <label style={{ color: "gold" }}>Overview:</label>
            {item.overview}...
          </label>
          <div className="movietv-slider-card-details-watch">
            <button>
              More Details
              <FaAngleDoubleRight />
            </button>
            <button>
              <FaVideo /> Trailer
            </button>
            <button>
              <FaPlay />
              Watch Now
            </button>
          </div>
        </div>
      </div>
    );
  });
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    // speed: 300,
    autoplaySpeed: 1000,
    // cssEase: "linear",
    // swipeToSlide: true,
  };
  return (
    <>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        <NavLink to="/">Home</NavLink>
      </h1>
      <div id="movie-main">
        <div className="movies-content">{itemsToRender}</div>
      </div>
    </>
  );
}
export default Test;
