import React, { useEffect, useState } from "react";
import Navigation from "./Navigation/Navigation";
import "./Container.css";
import "./Container-responsive.css";
import axios from "axios";
import Movie from "../components/Movie/Movie";
import { useSelector, useDispatch } from "react-redux";
import { saveMovies } from "./../initialState";
import Footer from "./Footer/Footer";
import Spinner from "../components/Spinner/Spinner";
import Aux from "../hoc/Aux";
import SlideMenu from "../components/SlideMenu/SlideMenu";

const container = (props) => {
  let [pageNumUrl, setPageNumUrl] = useState(1);
  const darkTheme = useSelector((state) => state.mainState.darkTheme);
  const movies = useSelector((state) => state.mainState.movies);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [finishedGetting, setFinnishedGetting] = useState(false);

  useEffect(() => {
    axios
      .get(`https://yts.mx/api/v2/list_movies.json?page=${pageNumUrl}`)
      .then((res) => {
        setLoading(true);
        dispatch(saveMovies({ topMovies: res.data.data.movies }));
        console.log(
          `https://yts.mx/api/v2/list_movies.json?page=${pageNumUrl}`,
          res
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setFinnishedGetting(true);
        setLoading(false);
      });
  }, [pageNumUrl]);
  // if (
  //   window.innerHeight + window.scrollY >= document.body.offsetHeight &&
  //   finishedGetting
  // ) {
  //   setPageNumUrl(pageNumUrl++);
  // }

  const localMovies = movies
    ? movies.map((movie, i) => (
        <Movie
          key={movie.imdb_code + i}
          title={movie.title_english}
          image={movie.medium_cover_image}
          imdbRating={movie.rating}
          genres={movie.genres.join(" | ")}
          year={movie.year}
          ageRating={movie.mpa_rating}
          imdbCode={movie.imdb_code}
          id={movie.id}
          forSug={false}
        />
      ))
    : "";

  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      setPageNumUrl(pageNumUrl++);
      console.log("SHOULD FIRE", pageNumUrl);
      this.window.removeEventListener("scroll", () =>
        console.log("Listener removed")
      );
    }
  });

  const data = movies ? (
    <Aux>
      <Navigation />
      <SlideMenu />
      <div
        className={`movies-container ${
          darkTheme ? "movies-container-dark" : "movies-container-light"
        }`}
      >
        {movies ? localMovies : null}
      </div>
      <Footer />
    </Aux>
  ) : (
    ""
  );

  return (
    <div
      className={`main-all-container ${
        darkTheme ? "main-all-container-dark" : "main-all-container-light"
      }`}
    >
      {loading ? <Spinner /> : data}
    </div>
  );
};

export default container;
