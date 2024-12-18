import { createSlice } from "@reduxjs/toolkit";
const wlmovies = JSON.parse(localStorage.getItem("wlmovies"));

const initialState = {
  movies: wlmovies || {},
};

const watchLaterMoviesSlice = createSlice({
  name: "wlMovies",
  initialState,
  reducers: {
    addWatchLaterMovies: (state, action) => {
        const exists = !!state.movies[action.payload.id]
        if (!exists) {
          state.movies[action.payload.id] = action.payload
          localStorage.setItem("wlmovies", JSON.stringify(state.movies));
        }
      },
    deleteWatchLaterMovies: (state, action) => {
      delete state.movies[action.payload.id]
      localStorage.setItem("wlmovies", JSON.stringify(state.movies));
    },
    clearWatchLaterMovies: (state) => {
      state.movies = {};
      localStorage.setItem("wlmovies", JSON.stringify({}));
    },
  },
});

export const {
  addWatchLaterMovies,
  deleteWatchLaterMovies,
  clearWatchLaterMovies,
} = watchLaterMoviesSlice.actions;
export default watchLaterMoviesSlice.reducer;
