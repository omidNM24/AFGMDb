import React, { useEffect, useState } from "react";
import "./SearchResults.css";
import { useParams } from "react-router";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { saveResultMovies } from "./../../initialState";
import Navigation from "../Navigation/Navigation";
import Movie from "../../components/Movie/Movie";
import Aux from "../../hoc/Aux";
import Spinner from "../../components/Spinner/Spinner";
import SearchResultsControls from "../../components/SearchReslutsControls/SearchResultsControls";
import Footer from "./../Footer/Footer";
import NoResults from "../../components/NoResults/NoResults";
import SlideMenu from "../../components/SlideMenu/SlideMenu";

const searchResults = () => {
  const result = useSelector((state) => state.mainState.resultMovies);
  const darkTheme = useSelector((state) => state.mainState.darkTheme);
  const genres = useSelector((state) => state.mainState.searchParams.genres);
  const quality = useSelector((state) => state.mainState.searchParams.quality);
  const sortBy = useSelector((state) => state.mainState.searchParams.sortBy);
  let [pageNumUrl, setPageNumUrl] = useState(1);
  const [noResults, setNoResults] = useState(false);
  const dispatch = useDispatch();
  const { name, page } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://yts.mx/api/v2/list_movies.json?query_term='${name}'&page=${pageNumUrl}&genre=${genres.join(
          ","
        )}&quality=${quality}&sort_by=${sortBy}`
      )
      .then((res) => {
        setLoading(true);
        res.data.data.movie_count == 0 || !res.data.data.movies
          ? setNoResults(true)
          : setNoResults(false);
        console.log(res);
        if (res) {
          dispatch(saveResultMovies({ result: res.data.data.movies }));
        } else {
          dispatch(
            saveResultMovies({ result: `There is not results for your query` })
          );
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [sortBy, genres, quality, page, name, pageNumUrl]);

  const resultMovies = result
    ? result.map((movie, i) => (
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
    : null;

  // window.addEventListener("scroll", function (ev) {
  //   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //     console.log("should Update");
  //     console.log(pageNumUrl);

  //     setPageNumUrl(pageNumUrl++);
  //   }
  // });

  const searchResultsData = (
    <Aux>
      <Navigation />
      <SlideMenu />

      <div className="results-header">
        <h1 className="results-header-title">Results for " {name} ":</h1>
        <SearchResultsControls />
      </div>
      <div className="results-container">
        {!noResults ? (
          <Aux>
            <div
              className={`movies-container noPadding ${
                darkTheme ? "movies-container-dark" : "movies-container-light"
              }`}
            >
              {resultMovies}
            </div>
          </Aux>
        ) : (
          <NoResults
            search={name}
            showQuality={quality !== "" ? true : false}
            showGenres={genres !== [] ? true : false}
            paramsData={{ genres: genres, quality: quality }}
          />
        )}
      </div>
      <Footer />
    </Aux>
  );

  return (
    <div
      className={`search-results-main-container ${
        darkTheme ? "main-all-container-dark" : "main-all-container-light"
      }`}
    >
      {loading ? <Spinner /> : searchResultsData}
    </div>
  );
};

export default searchResults;
