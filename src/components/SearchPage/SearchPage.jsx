import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import {
  FaAngleDoubleRight,
  FaCalendar,
  FaPlay,
  FaStar,
  FaVideo,
} from "react-icons/fa";
import noImage from "../images/noimage.jpg";
import { AiOutlineClose } from "react-icons/ai";

function SearchPage() {
  let { searchQuery } = useParams();
  let [itemsData, setItemsData] = useState([]);
  let [displayDetails, setDisplayDetails] = useState("");
  let [popUpclass, setPopUpClass] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=false&language=en-US&api_key=6d12d8c51590cd478561b8c0d68dc184`
      );
      if (!response.ok) {
        alert("Caught a error while fetching data.");
      }
      const data = await response.json();
      setItemsData(data.results);
    };
    fetchData();
  }, [searchQuery]);
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
      <div id="movie-main">
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
        <div id="nav-gap"> </div>
        <label
          style={{
            display: "flex",
            position: "relative",
            alignSelf: "center",
            width: "80vw",
            fontSize: "2vw",
          }}
        >
          <label style={{ color: "gold" }}>Searched for : </label>&nbsp;&nbsp;
          {searchQuery}
        </label>
        <div className="movies-content">
          {itemsData.length !== 0 ? (
            itemsData.map((item) => {
              return (
                <div className="card-slider-card">
                  <div className="movietv-slider-card">
                    <img
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                          : item.known_for && item.known_for.length > 0
                          ? `https://image.tmdb.org/t/p/w500${item.known_for[0].poster_path}`
                          : { noImage }
                      }
                      id={item.id}
                      // alt={item.title ? item.title : item.name}
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
                      {item.release_date
                        ? item.release_date
                        : item.first_air_date}
                    </label>
                    <label className="overview-label">
                      <label style={{ color: "gold", height: "0rem" }}>
                        Overview:
                      </label>
                      {item.overview
                        ? item.overview
                        : item.known_for && item.known_for.length > 0
                        ? item.known_for[0].overview
                        : ""}
                      ...
                    </label>
                    <div className="movietv-slider-card-details-watch">
                      <button
                        onClick={() =>
                          displayDetailsFunc(item.id, item.media_type)
                        }
                      >
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
            })
          ) : (
            <label
              style={{
                display: "flex",
                position: "relative",
                justifyContent: "center",
                alignSelf: "center",
                width: "80vw",
                fontSize: "6vw",
                color: "gold",
              }}
            >
              No Movies Found
            </label>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchPage;
