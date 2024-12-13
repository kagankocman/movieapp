import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const getAllApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/",
    prepareHeaders: (headers) => {
      if (API_KEY) {
        headers.set("Authorization", `Bearer ${API_KEY}`);
      }
      headers.set("accept", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ search = "", page = 1 }) =>
        `search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          search
        )}&page=${page}`,
    }),

    getSeries: builder.query({
      query: ({ search = "", page = 1 }) =>
        `search/tv?api_key=${API_KEY}&query=${encodeURIComponent(
          search
        )}&page=${page}`,
    }),
    getMovie: builder.query({
      query: ({ id }) => `movie/${id}?api_key=${API_KEY}`,
    }),
    getSerie: builder.query({
      query: ({ id }) => `tv/${id}?api_key=${API_KEY}`,
    }),
    getTopRatedMovies: builder.query({
      query: ( page = 1 ) =>
        `movie/top_rated?api_key=${API_KEY}&page=${page}`,
    }),
    getTopRatedSeries: builder.query({
      query: ( page = 1 ) =>
        `tv/top_rated?api_key=${API_KEY}&page=${page}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetSeriesQuery, useGetMovieQuery, useGetSerieQuery, useGetTopRatedMoviesQuery, useGetTopRatedSeriesQuery } =
  getAllApi;
