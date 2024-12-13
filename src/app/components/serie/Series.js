import React from "react";
import SeriesSearch from "./SeriesSearch";
import SeriesTable from "./SeriesTable";
import SeriesPagination from "./SeriesPagination";
import SerieDetails from "./SerieDetails";

function Series() {
  return (
    <>
      <SeriesSearch />
      <SeriesTable />
      <SeriesPagination />
      <SerieDetails/>
    </>
  );
}

export default Series;
