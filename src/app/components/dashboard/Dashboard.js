import React from "react";
import TopRatedMovies from "./TopRatedMovies";
import TopRatedSeries from "./TopRatedSeries";
import ItemDetails from "../common/ItemDetails";
import TrendingMovies from "./TrendingMovies";
import TrendingSeries from "./TrendingSeries";

function Dashboard() {
  return (
    <>
      <TopRatedMovies />
      <TrendingMovies />
      <TopRatedSeries />
      <TrendingSeries />
      <ItemDetails type={1} />
      <ItemDetails type={2} />
    </>
  );
}

export default Dashboard;
