import React from "react";
import MoviesSearch from "./MoviesSearch";
import MoviesPagination from "./MoviesPagination";
import MoviesTable from "./MoviesTable";
import ItemDetails from "../common/ItemDetails";

function Movies() {
  return (
    <>
      <MoviesSearch />
      <MoviesTable />
      <MoviesPagination />
      <ItemDetails type={1} />
    </>
  );
}

export default Movies;
