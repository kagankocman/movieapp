import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

const trendingMoviesSlice = createSlice({
  name: "trendingMovies",
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

export const { addMovies, clearMovies } = trendingMoviesSlice.actions;
export default trendingMoviesSlice.reducer;

