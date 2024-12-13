import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

const topRatedMoviesSlice = createSlice({
  name: "topRatedMovies",
  initialState,
  reducers: {
    addMovies: (state, action) => {
      const newMovies = action.payload.filter(
        (newMovie) => !state.movies.some((movie) => movie.id === newMovie.id)
      );
      state.movies = [...state.movies, ...newMovies];
    },
    clearMovies: (state) => {
      state.movies = [];
    },
  },
});

export const { addMovies, clearMovies } = topRatedMoviesSlice.actions;
export default topRatedMoviesSlice.reducer;

