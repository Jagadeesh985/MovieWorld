import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from "./components/Movies/Movies";
import Tv from "./components/Tv";
import Anime from "./components/Anime/Anime";
import MainPage from "./components/MainPage";
import Test from "./components/Test/Test";
import "./components/displayDetails.css";
import SearchPage from "./components/SearchPage/SearchPage";
// import "./components/Home/home.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/Test" element={<Test />} />
          <Route path="/search/:searchQuery" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
      {/* <MoviesDataState> */}
      {/* <Home /> */}
      {/* </MoviesDataState> */}
      {/* <CarouselComp /> */}
      {/* <SliderCom /> */}
    </div>
  );
}

export default App;
