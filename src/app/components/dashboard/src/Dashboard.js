import React from "react";
import TopRatedMovies from "./TopRatedMovies";
import TopRatedSeries from "./TopRatedSeries";
import MovieDetails from "../../movie/MovieDetails";
import SerieDetails from "../../serie/SerieDetails";

function Dashboard() {
  return (
    <>
      <TopRatedMovies />
      <TopRatedSeries />
      <MovieDetails />
      <SerieDetails />
    </>
  );
}

export default Dashboard;
