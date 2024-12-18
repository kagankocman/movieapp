import React from "react";
import WatchLaterMovies from "./WatchLaterMovies";
import WatchLaterSeries from "./WatchLaterSeries";
import ItemDetails from "../common/ItemDetails";

function WatchLater() {
  return (
    <>
      <WatchLaterMovies />
      <WatchLaterSeries />
      <ItemDetails type={1} />
      <ItemDetails type={2} />
    </>
  );
}

export default WatchLater;
