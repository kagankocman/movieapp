import React from "react";
import WatchLaterMovies from "./WatchLaterMovies";
import WatchLaterSeries from "./WatchLaterSeries";
import MovieDetails from "../../movie/MovieDetails";
import SerieDetails from "../../serie/SerieDetails";

function WatchLater() {
  return (
    <>
     <WatchLaterMovies/>
     <MovieDetails/>
     <WatchLaterSeries/>
     <SerieDetails/>
    </>
  );
}

export default WatchLater;
