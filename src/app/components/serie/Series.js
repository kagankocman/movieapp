import React from "react";
import SeriesSearch from "./SeriesSearch";
import SeriesTable from "./SeriesTable";
import SeriesPagination from "./SeriesPagination";
import ItemDetails from "../common/ItemDetails";

function Series() {
  return (
    <>
      <SeriesSearch />
      <SeriesTable />
      <SeriesPagination />
      <ItemDetails type={2} />
    </>
  );
}

export default Series;
