import React from "react";
import MoviesSearch from "./MoviesSearch";
import MoviesPagination from "./MoviesPagination";
import MoviesTable from "./MoviesTable";
import MovieDetails from "./MovieDetails";

function Movies() {
  return (
    <>
      <MoviesSearch />
      <MoviesTable />
      <MoviesPagination />
      <MovieDetails />
    </>
  );
}

export default Movies;
