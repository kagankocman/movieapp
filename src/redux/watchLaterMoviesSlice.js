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
        // const exists = state.movies.some((item) => item.id === action.payload.id);
        if (!exists) {
          state.movies[action.payload.id] = action.payload
              // .push(action.payload);
          localStorage.setItem("wlmovies", JSON.stringify(state.movies));
        }
      },
    deleteWatchLaterMovies: (state, action) => {
      delete state.movies[action.payload.id]
      // state.movies = state.movies.filter(
      //   (item) => item.id !== action.payload.id
      // );
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
