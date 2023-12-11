import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaCalendar, FaClock, FaPlay } from "react-icons/fa";

function AnimeMainSlider() {
  let [itemsList, setItems] = useState([]);
  let url = "https://api.jikan.moe/v4/top/anime?type=tv&filter=airing&limit=10";
  useEffect(() => {
    if (itemsList.length === 0) {
      const fetchData = async () => {
        const response = await fetch(url);
        const data = await response.json();
        setItems(data.data);
      };
      fetchData();
    }
  }, []);
  const itemsToRender = itemsList.map((item) => {
    return (
      <div className="slider-card-main" key={item.mal_id}>
        <img src={item.images.webp.large_image_url} alt={item.title_english} />
        <div
          className="slider-card-content"
          style={{ backgroundImage: `url${item.images.webp.large_image_url}` }}
        >
          <div>
            <label>{item.title_english}</label>
            <label style={{ color: "white" }}>({item.title_japanese})</label>
            <label>
              <FaPlay />
              {item.type}&nbsp;
              <FaClock />
              {item.duration.substring(0, 2) + "min"} &nbsp;
              <FaCalendar />
              {item.aired.from.substring(0, 10)}{" "}
            </label>
            <label>Synopsis:</label>
            <label
              style={{
                color: "white",
                overflow: "scroll",
              }}
            >
              {item.synopsis}
            </label>
          </div>
        </div>
      </div>
    );
  });
  const settings = {
    dots: false,
    infinite: true,
    // speed: 500,
    slidesToShow: 1,
    // slidesToScroll: 1,
    // autoplay: true,
    speed: 300,
    // autoplaySpeed: 5000,
    cssEase: "linear",
    swipeToSlide: true,
  };
  return (
    <div id="main-slider">
      <Slider {...settings}>{itemsToRender}</Slider>
    </div>
  );
}

export default AnimeMainSlider;
