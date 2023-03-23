import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Movie.css";
import { useSelector } from "react-redux";

const movie = (props) => {
  const darkTheme = useSelector((state) => state.mainState.darkTheme);
  let [hilighted, setHighlighted] = useState(false);

  const addHighlightManage = () => {
    setHighlighted(true);
  };
  const removeHighlightManage = () => {
    setHighlighted(false);
  };

  const classes = [
    "movie-con",
    "movie-con-dark",
    hilighted
      ? ` ${darkTheme ? "movie-highlight-dark" : "movie-highlight-light"}`
      : "",
  ];

  const movieData = hilighted ? (
    <div
      className={`movie-detail-con ${
        darkTheme ? "movie-detail-con-dark" : "movie-detail-con-light"
      }`}
    >
      <h1 className="movie-title">
        {props.title.length >= 20 ? (
          <marquee className="movie-title" scrollamount={13}>
            {props.title}
          </marquee>
        ) : (
          props.title
        )}
      </h1>
      <p className="movie-short-detail">IMDb: {props.imdbRating}</p>
      <p className="movie-short-detail">
        Genres:{" "}
        {props.genres.length >= 18 ? (
          <marquee className="movie-genres" scrollamount={10}>
            {props.genres}
          </marquee>
        ) : (
          props.genres
        )}
      </p>
      <p className="movie-short-detail">Year: {props.year}</p>
      <p className="movie-short-detail">Rated: {props.ageRating}</p>
    </div>
  ) : (
    ""
  );

  const mobileMovieData = (
    <div
      className={`movie-detail-con mobile-movie-detail-con ${
        darkTheme
          ? "mobile-movie-detail-con-dark"
          : "mobile-movie-detail-con-light"
      }`}
    >
      <h1 className="movie-title mobile-movie-title">
        {props.title.length >= 25 ? (
          <marquee className="movie-title mobile-movie-title" scrollamount={13}>
            {props.title}
          </marquee>
        ) : (
          props.title
        )}
      </h1>
      <p
        className={`movie-short-detail mobile-short-detail ${
          darkTheme ? "darker-text" : "lighter-text"
        }`}
      >
        {props.year}
      </p>
    </div>
  );

  return (
    <Link
      className={`movie-link ${
        props.forSug ? "movie-link-for-suggestion" : ""
      }`}
      to={`/details/${props.id}`}
    >
      <div
        className={`movie-main-con ${
          darkTheme ? "movie-main-con-dark" : "movie-main-con-light"
        }
        ${props.forSug ? "movie-main-con-for-suggestion" : ""}`}
      >
        <div
          className={classes.join(" ")}
          onMouseEnter={addHighlightManage}
          onMouseLeave={removeHighlightManage}
          style={{ backgroundImage: `url('${props.image}')` }}
        >
          {window.matchMedia("(pointer: coarse)").matches
            ? mobileMovieData
            : movieData}
        </div>
      </div>
    </Link>
  );
};

export default movie;
