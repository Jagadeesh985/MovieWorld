import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "./slider.css";
import Spinner from "react-bootstrap/esm/Spinner";
import {
  FaAngleDoubleRight,
  FaCalendar,
  FaPlay,
  FaStar,
  FaVideo,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const itemsList = [
  {
    field: "movie",
    type: "popular",
    heading: "Popular Movies",
  },
  {
    field: "movie",
    type: "top_rated",
    heading: "Top Rated Movies",
  },
  {
    field: "movie",
    type: "upcoming",
    heading: "Upcoming Movies",
  },
  {
    field: "tv",
    type: "popular",
    heading: "Popular Tv Shows",
  },
  {
    field: "tv",
    type: "top_rated",
    heading: "Top Rated Tv Shows",
  },
];

function Index() {
  const api_key = "6d12d8c51590cd478561b8c0d68dc184";
  let [items, setItems] = useState([]);
  // let [itemsError, setItemsError] = useState(false);
  useEffect(() => {
    // setItems([]);
    const fetchData = async (url, heading, field) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network Error");
        }
        const data = await response.json();
        const result = {
          data: data.results,
          response: true,
          heading: heading,
          field: field,
        };

        let searchDuplicate = false;
        for (let index = 0; index < items.length; index++) {
          if (heading === items[index].heading) {
            searchDuplicate = true;
          }
        }
        if (!searchDuplicate) {
          setItems((prevstate) => [...prevstate, result]);
        }
      } catch (err) {
        const result = {
          data: null,
          response: false,
          heading: heading,
          field: field,
        };
        setItems((prevstate) => [...prevstate, result]);
      }
    };
    itemsList.forEach((eachItem) => {
      let url = `https://api.themoviedb.org/3/${eachItem.field}/${eachItem.type}?language=en-US&api_key=${api_key}`;
      fetchData(url, eachItem.heading, eachItem.field);
    });
  }, []);

  function removeDuplicates(arr, key) {
    const uniqueKeys = {};
    return arr.filter((item) => {
      if (!uniqueKeys[item[key]]) {
        uniqueKeys[item[key]] = true;
        return true;
      }
      return false;
    });
  }
  let op = removeDuplicates(items, "heading");
  return (
    <div id="popular-main">
      {op.map((item, index) => {
        return (
          <SliderCom
            items={item.data}
            heading={item.heading}
            field={item.field}
            key={index}
          />
        );
      })}
    </div>
  );
}
export default Index;

export function SliderCom(props) {
  let [isLoading, setLoading] = useState("asd");
  let [displayDetails, setDisplayDetails] = useState("");
  let [popUpclass, setPopUpClass] = useState("");
  const settings = {
    dots: false,
    infinite: true,
    // speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 5000,
    cssEase: "linear",
    swipeToSlide: true,
  };
  const items = props.items.map((item, index) => {
    return (
      <div className="card-slider" key={index}>
        <div className="slider-card">
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            id={item.id}
            alt={item.title ? item.title : item.name}
          />
          <label htmlFor={item.id}>{item.title ? item.title : item.name}</label>
        </div>
        <div className="slider-card-details">
          <label style={{ color: "orange" }}>
            {item.title ? item.title : item.name}
          </label>
          <label>
            <FaStar style={{ color: "gold" }} />
            {item.vote_average}&nbsp;&nbsp;
            <FaCalendar style={{ color: "gold" }} />
            {item.release_date ? item.release_date : item.first_air_date}
            &nbsp;&nbsp;
            {props.field.toUpperCase()}
          </label>
          <label className="overview-label">
            <label style={{ color: "gold" }}>Overview:</label>
            {item.overview}...
          </label>
          <div className="slider-card-details-watch">
            <button onClick={() => displayDetailsFunc(item.id, props.field)}>
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
    <div className="popular-main-child">
      {isLoading === "loading" ? (
        <div className="spinner">
          <Spinner variant="white" />
        </div>
      ) : isLoading === "error" ? (
        <div className="error-message">
          <label>Network Problem</label>
        </div>
      ) : (
        <>
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
          <span>
            <label>{props.heading}</label>{" "}
          </span>

          <Slider {...settings}>{items}</Slider>
        </>
      )}
    </div>
  );
}
