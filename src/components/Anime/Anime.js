import React, { useEffect } from "react";
import Navbar from "../Navbar";
import AnimeMainSlider from "./AnimeMainSlider";
import "./animemainslider.css";
import AnimeSliders from "./AnimeSliders";

function Anime() {
  useEffect(() => {});
  return (
    <>
      <Navbar />
      <div id="anime-main">
        <AnimeMainSlider />
        <div id="content">
          {/* <div>
            <label>Popular Shows</label>
            <AnimeSliders type="tv" filter="bypopularity" />
          </div>
          <div>
            <label>Popular Movies</label>
            <AnimeSliders type="movie" filter="bypopularity" />
          </div>
          <div>
            <label>Favorite Show</label>
            <AnimeSliders type="tv" filter="favorite" />
          </div>
          <div>
            <label>Favorite Movies</label>
            <AnimeSliders type="movie" filter="favorite" />
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Anime;
