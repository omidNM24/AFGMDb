import React, { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import Navigation from "../Navigation/Navigation";
import axios from "axios";
import Footer from "../Footer/Footer";
import Movie from "../../components/Movie/Movie";
import { useParams } from "react-router-dom";
import "./MoreDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  saveSuggestedMovies,
  setSelectedMovie,
  changeError,
} from "../../initialState";
import Spinner from "../../components/Spinner/Spinner";
import Aux from "../../hoc/Aux";
import Comments from "../../components/Comments/Comments";
import SlideMenu from "../../components/SlideMenu/SlideMenu";
const moreDetails = () => {
  const suggestedMovies = useSelector(
    (state) => state.mainState.suggestedMovies
  );
  let { id } = useParams();
  const selectedMovie = useSelector((state) => state.mainState.selectedMovie);
  const darkTheme = useSelector((state) => state.mainState.darkTheme);
  const isError = useSelector((state) => state.mainState.error);
  const dispatch = useDispatch();
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    axios
      .get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
      .then((res) => {
        dispatch(setSelectedMovie({ selectedMovie: res.data.data.movie }));
        dispatch(changeError({ type: false }));
      })
      .catch((err) => dispatch(changeError({ type: true })));
  }, [id]);

  useEffect(() => {
    axios
      .get(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${id}`)
      .then((res) => {
        setShowSpinner(true);
        dispatch(
          saveSuggestedMovies({ suggestedMovies: res.data.data.movies })
        );
      })
      .catch((err) => console.dir(err))
      .finally(setShowSpinner(false));
  }, [id]);
  const sugMovies = suggestedMovies.map((movie, i) => (
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
      forSug={true}
    />
  ));

  const data = (
    <Aux>
      <Navigation />
      <SlideMenu />
      <Hero movieId={id} />
      <div
        className={`suggestion-container ${
          darkTheme ? "con-dark" : "con-light"
        }`}
      >
        <h1 className="suggested-title">Suggested: </h1>
        <div className={`suggested-movies `}>{sugMovies}</div>
      </div>
      {/* <Comments /> */}
      <Footer />
    </Aux>
  );

  return isError ? (
    <h1>The Movie Isn't Available!</h1>
  ) : (
    <div className="more-details-container">
      {!showSpinner ? <Spinner /> : data}
    </div>
  );
};

export default moreDetails;
