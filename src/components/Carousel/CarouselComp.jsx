import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.css";

function CarouselComp(props) {
  let CarouselItems = props.items.map((item, i) => {
    return (
      <Carousel.Item interval={1500} className="carousel-item" key={i}>
        <img
          className="carousel-image"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
          id={item.id}
        />
        <Carousel.Caption className="carousel-caption">
          <label htmlFor={item.id}>{item.title ? item.title : item.name}</label>
        </Carousel.Caption>
      </Carousel.Item>
    );
  });
  return (
    <Carousel
      indicators={false}
      fade
      style={{
        display: "block",
        width: "100vw",
        background: "#242428",
      }}
    >
      {CarouselItems}
    </Carousel>
  );
}

export default CarouselComp;
