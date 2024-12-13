import { configureStore } from "@reduxjs/toolkit";
import { getAllApi } from "../api/apiSlice";
import moviesReducer from "../redux/moviesSlice";
import seriesReducer from "../redux/seriesSlice";
import movieReducer from "../redux/movieSlice";
import serieReducer from "../redux/serieSlice";
import topRatedMoviesReducer from "../redux/topRatedMoviesSlice";
import topRatedSeriesReducer from "../redux/topRatedSeriesSlice";
import watchLaterMoviesReducer from "../redux/watchLaterMoviesSlice";
import watchLaterSeriesReducer from "../redux/watchLaterSeriesSlice";

export const store = configureStore({
  reducer: {
    [getAllApi.reducerPath]: getAllApi.reducer,
    movies: moviesReducer,
    series: seriesReducer,
    movie: movieReducer,
    serie: serieReducer,
    topRatedMovies: topRatedMoviesReducer,
    topRatedSeries: topRatedSeriesReducer,
    wlMovies: watchLaterMoviesReducer,
    wlSeries: watchLaterSeriesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getAllApi.middleware),
});
