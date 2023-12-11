import React, { useEffect, useState } from "react";
import Slider from "react-slick";

function AnimeSliders(props) {
  let { type, filter } = props;
  let [popularShows, setPopularShows] = useState([]);
  let url = `https://api.jikan.moe/v4/top/anime?type=${type}&filter=${filter}`;
  useEffect(() => {
    if (popularShows.length === 0) {
      const fetchData = async () => {
        //   console.log("Rendering");
        const response = await fetch(url);
        const data = await response.json();
        setPopularShows(data.data);
      };
      fetchData();
    }
  }, []);

  const itemsToRender = popularShows.map((item) => {
    return (
      <div className="slider-card" key={item.mal_id}>
        <img src={item.images.webp.large_image_url} alt={item.title_english} />
        <label>{item.title_english}</label>
        <label style={{ color: "white" }}>({item.title_japanese})</label>
      </div>
    );
  });
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
  return (
    <div className="mini-sliders">
      <Slider {...settings}>{itemsToRender}</Slider>
    </div>
  );
}
export default AnimeSliders;
