import React, { useState } from "react";
import "./SearchReslutsControls.css";
import { useSelector, useDispatch } from "react-redux";
import {
  saveSearchParamsSortby,
  saveSearchParamsQuality,
  saveSearchParamsGenres,
} from "./../../initialState";
import Aux from "../../hoc/Aux";
import ShowButton from "./Button/ShowButton";

const searchResultsControls = (props) => {
  const [showSortby, setShowSortby] = useState(false);
  const [showQuality, setShowQuality] = useState(false);
  const [showGenres, setShowGenres] = useState(false);
  const paramsGenres = useSelector(
    (state) => state.mainState.searchParams.genres
  );
  const paramsSortby = useSelector(
    (state) => state.mainState.searchParams.sortBy
  );
  const paramsQuality = useSelector(
    (state) => state.mainState.searchParams.quality
  );

  const dispatch = useDispatch();
  const movieGenres = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film Noir",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Short Film",
    "Sport",
    "Superhero",
    "Thriller",
    "War",
    "Western",
  ];
  const movieSortby = [
    "title",
    "year",
    "rating",
    "peers",
    "seeds",
    "download_count",
    "like_count",
    "date_added",
  ];

  const movieQualities = ["480p", "720p", "1080p", "2160p", "3D"];

  const genres = movieGenres.map((genre, i) => {
    return (
      <span
        className={`sort-data ${i % 2 == 0 ? "sort-data-deff" : ""} ${
          paramsGenres.includes(genre) ? "sort-data-active" : ""
        }`}
        onClick={() => {
          dispatch(
            saveSearchParamsGenres({
              paramsGenres: genre,
              paramsGenresIndex: i,
            })
          );
        }}
        key={genre + i}
      >
        {genre}
      </span>
    );
  });

  const sortby = movieSortby.map((sort, i) => {
    return (
      <span
        className={`sort-data ${i % 2 == 0 ? "sort-data-deff" : ""} ${
          paramsSortby.includes(sort) ? "sort-data-active" : ""
        }`}
        key={sort + i}
        onClick={() => dispatch(saveSearchParamsSortby({ paramsSortby: sort }))}
      >
        {sort.replace("_", " ")}
      </span>
    );
  });

  const quality = movieQualities.map((q, i) => {
    return (
      <span
        className={`sort-data ${i % 2 == 0 ? "sort-data-deff" : ""} ${
          paramsQuality.includes(q) ? "sort-data-active" : ""
        }`}
        key={q + i}
        onClick={() => dispatch(saveSearchParamsQuality({ paramsQuality: q }))}
      >
        {q}
      </span>
    );
  });

  // const btnComponent = (name, show, set) => {
  //   return (

  //   );
  // };

  return (
    <div className="search-controls-main-container">
      <div className="show-btns-container">
        <ShowButton content={sortby} show={showSortby} set={setShowSortby}>
          Sort by
        </ShowButton>
        <ShowButton content={quality} show={showQuality} set={setShowQuality}>
          Quality
        </ShowButton>
        <ShowButton content={genres} show={showGenres} set={setShowGenres}>
          Genre
        </ShowButton>
      </div>
    </div>
  );
};

export default searchResultsControls;
