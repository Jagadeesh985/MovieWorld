import React, { useEffect, useState } from "react";
import MovieDataContext from "./MoviesDataContext";

function MoviesDataState(props) {
  let [movieData, setMovieData] = useState([]);
  let testData = "Working..";
  const mainUrl =
    "https://api.themoviedb.org/3/trending/all/day?language=en-US";
  const api_key = "6d12d8c51590cd478561b8c0d68dc184";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDEyZDhjNTE1OTBjZDQ3ODU2MWI4YzBkNjhkYzE4NCIsInN1YiI6IjY1NDYwMDg5ZmQ0ZjgwMDBhZTJhNDFkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n7iSJLP32ZvoZ8mW0Qp4wh4Pzrbvbh6bN1X7HjuuYRo",
    },
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(mainUrl, options);
  //       if (!response.ok) {
  //         throw new Error("Error while fetching the data");
  //       }
  //       const data = await response.json();
  //       setMovieData(data);
  //     } catch (err) {
  //       console.log("Error", err);
  //     }
  //   };
  //   fetchData();
  // }, []);
  return (
    <MovieDataContext.Provider value={{ movieData, testData, api_key }}>
      {props.children}
    </MovieDataContext.Provider>
  );
}

export default MoviesDataState;
