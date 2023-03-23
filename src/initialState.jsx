import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkTheme: true,
  movies: [],
  error: false,
  selectedMovie: "",
  suggestedMovies: [],
  resultMovies: [],
  searchParams: {
    sortBy: "",
    genres: [],
    quality: "",
  },
};

export const mainState = createSlice({
  name: "mainState",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      action.payload.darkTheme == "true"
        ? (state.darkTheme = true)
        : (state.darkTheme = false);
    },
    changeError: (state, action) => {
      state.error = action.payload.type;
    },
    saveMovies: (state, action) => {
      state.movies.push(...action.payload.topMovies);
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload.selectedMovie;
    },
    saveSuggestedMovies: (state, action) => {
      state.suggestedMovies = action.payload.suggestedMovies;
    },
    saveSearchParamsSortby: (state, action) => {
      if (state.searchParams.sortBy == action.payload.paramsSortby) {
        state.searchParams.sortBy = "";
      } else {
        state.searchParams.sortBy = action.payload.paramsSortby;
      }
    },
    saveSearchParamsGenres: (state, action) => {
      if (!state.searchParams.genres.includes(action.payload.paramsGenres)) {
        state.searchParams.genres.push(action.payload.paramsGenres);
      } else {
        const res = state.searchParams.genres.filter((genre) => {
          return genre !== action.payload.paramsGenres;
        });
        state.searchParams.genres = res;
      }
    },
    saveSearchParamsQuality: (state, action) => {
      if (state.searchParams.quality == action.payload.paramsQuality) {
        state.searchParams.quality = "";
      } else {
        state.searchParams.quality = action.payload.paramsQuality;
      }
    },
    clearSearchParams: (state) => {
      state.searchParams.sortBy = "";
      state.searchParams.genres = [];
      state.searchParams.quality = "";
    },
    saveResultMovies: (state, action) => {
      state.resultMovies.push(...action.payload.result);
    },
  },
});

export const {
  changeTheme,
  saveMovies,
  setSelectedMovie,
  saveSuggestedMovies,
  changeError,
  saveResultMovies,
  saveSearchParamsSortby,
  saveSearchParamsGenres,
  saveSearchParamsQuality,
  clearSearchParams,
} = mainState.actions;

export default mainState.reducer;
