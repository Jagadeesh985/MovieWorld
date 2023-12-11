import React, { useState } from "react";
import "./navbar.css";
import { FaFilm, FaHome, FaSearch } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

function Index() {
  let navigate = useNavigate();
  let [searchQuery, setSearchQuery] = useState("");
  const searchMovie = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };
  return (
    <div id="nav-bar">
      <div id="nav-left">
        <div>
          <FaFilm style={{ fontSize: "1.5rem" }} />
          &nbsp;&nbsp;
          {/* <img src={logo} style={{ width: "2vw", borderRadius: "60%" }} />   */}
          Movie World
        </div>
        <div id="search-block">
          <FaSearch style={{ margin: "0px 4px", color: "rgb(59, 77, 217)" }} />
          <input
            id="search-input"
            type="search"
            placeholder="Search your movie"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                searchMovie();
              }
            }}
            style={{ border: "none", margin: "0px 10px" }}
          />
          <button onClick={searchMovie}>Search</button>
        </div>
      </div>
      <div id="nav-right">
        <ul>
          <li>
            <NavLink to="/">
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies">Movies</NavLink>
          </li>
          <li>
            <NavLink to="/tv">Tv Series</NavLink>
          </li>
          <li>
            <NavLink to="/anime">Anime</NavLink>
          </li>

          {/* <li>TV Series</li>
          <li>Anime</li>
          <li>Top List</li> */}
        </ul>
      </div>
    </div>
  );
}

export default Index;
