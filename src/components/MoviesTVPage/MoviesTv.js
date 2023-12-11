import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "./moviestv.css";
import {
  FaAngleDoubleRight,
  FaCalendar,
  FaPlay,
  FaStar,
  FaVideo,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

function MoviesTv(props) {
  const { field } = props;
  let [displayDetails, setDisplayDetails] = useState("");
  let [popUpclass, setPopUpClass] = useState("");

  const api_key = "6d12d8c51590cd478561b8c0d68dc184";
  let [itemsData, setItemsData] = useState([]);
  let [buttonBackGround, setButtonBackground] = useState("top_rated");

  const getApi = (type) => {
    return `https://api.themoviedb.org/3/${field}/${type}?language=en-US&api_key=${api_key}`;
  };

  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setItemsData(data.results);
  };

  useEffect(() => {
    fetchData(getApi("top_rated"));
  }, []);
  const displayMovies = (event) => {
    fetchData(getApi(event.target.value));
    setButtonBackground(event.target.value);
  };
  const minToHoursDuration = (time) => {
    let hrs = time / 60;
    let mins = time % 60;
    return Math.floor(hrs) + "hr:" + mins + "min";
  };
  const displayDetailsFunc = async (id, field) => {
    const fetchData = async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        // setDisplayDetails("Movie Detalis not found");
        return;
      }
      const data = await response.json();
      return data;
    };
    const url = `https://api.themoviedb.org/3/${field}/${id}?language=en-US&api_key=6d12d8c51590cd478561b8c0d68dc184`;
    const data = await fetchData(url);
    // console.log(data);
    const detailsData = (
      <div>
        <div>
          <div className="popup-head-close-div">
            <h2>{field === "movie" ? data.title : data.name}</h2>{" "}
            <button
              onClick={() => {
                setPopUpClass("close-popup");
              }}
            >
              <AiOutlineClose />
            </button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            style={{ width: "15vw" }}
            alt="Image Not Found"
          />
        </div>
        <div style={{ display: "flex" }}>
          <span className="popup-content-span">
            Rating:&nbsp;&nbsp;
            <FaStar />
          </span>
          {data.vote_average}&nbsp;&nbsp;&nbsp;
          <span className="popup-content-span">Duration:&nbsp;</span>
          {field === "movie"
            ? minToHoursDuration(data.runtime)
            : data.episode_run_time + "min"}
          &nbsp;&nbsp;&nbsp;
          <span className="popup-content-span">Release Date:&nbsp;</span>
          <FaCalendar />
          {field === "movie" ? data.release_date : data.first_air_date}
          &nbsp;&nbsp;&nbsp;
          <span className="popup-content-span">Status:&nbsp;</span>
          {data.status}
        </div>
        <span className="popup-content-span">
          <b>Overview:&nbsp;&nbsp;</b>
        </span>
        {data.overview}
      </div>
    );
    setPopUpClass("popup");
    setDisplayDetails(detailsData);
  };
  return (
    <>
      <Navbar />
      <div
        id={popUpclass}
        onClick={() => {
          setPopUpClass("close-popup");
        }}
      >
        <div
          className={popUpclass}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {displayDetails}
        </div>
      </div>
      <div id="movie-main">
        <div id="nav-gap"> </div>
        <div className="movie-types-btns">
          <button
            value="top_rated"
            onClick={displayMovies}
            className={buttonBackGround === "top_rated" ? "selected" : ""}
          >
            Top Rated
          </button>
          <button
            value="popular"
            onClick={displayMovies}
            className={buttonBackGround === "popular" ? "selected" : ""}
          >
            Popular
          </button>
          {field === "movie" ? (
            <button
              value="upcoming"
              onClick={displayMovies}
              className={buttonBackGround === "upcoming" ? "selected" : ""}
            >
              Upcoming
            </button>
          ) : (
            <button
              value="on_the_air"
              onClick={displayMovies}
              className={buttonBackGround === "on_the_air" ? "selected" : ""}
            >
              On The Air
            </button>
          )}
        </div>
        <div className="movies-content">
          {itemsData.map((item, index) => {
            return (
              <div className="card-slider-card" key={index}>
                <div className="movietv-slider-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    id={item.id}
                    alt={item.title ? item.title : item.name}
                  />
                  <label htmlFor={item.id}>
                    {item.title ? item.title : item.name}
                  </label>
                </div>
                <div className="movietv-slider-card-details">
                  <label style={{ color: "orange" }}>
                    {item.title ? item.title : item.name}
                  </label>
                  <label>
                    <FaStar style={{ color: "gold" }} />
                    {item.vote_average}&nbsp;&nbsp;
                    <FaCalendar style={{ color: "gold" }} />
                    {item.release_date}&nbsp;&nbsp;
                    {field.toUpperCase()}
                  </label>
                  <label className="overview-label">
                    <label style={{ color: "gold", height: "0rem" }}>
                      Overview:
                    </label>
                    {item.overview}...
                  </label>
                  <div className="movietv-slider-card-details-watch">
                    <button onClick={() => displayDetailsFunc(item.id, field)}>
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
          })}
        </div>
      </div>
    </>
  );
}

export default MoviesTv;
