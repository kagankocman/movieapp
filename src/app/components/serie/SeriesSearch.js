import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button } from "reactstrap";
import {
  setCurrentPage,
  setSearchTerm,
  setQueryTerm,
} from "../../../redux/seriesSlice";
import { useLocation } from "react-router-dom";

function SeriesSearch() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { searchTerm } = useSelector((state) => state.series);

  const handleSearch = () => {
    dispatch(setQueryTerm(searchTerm));
    dispatch(setCurrentPage(1));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    dispatch(setSearchTerm(""));
    dispatch(setQueryTerm(""));
    dispatch(setCurrentPage(1));
  }, [location.pathname, dispatch]);

  return (
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        onKeyDown={handleKeyDown}
        placeholder="Search a serie..."
      />
      <Button
        color="warning"
        onClick={handleSearch}
        style={{ marginTop: "10px" }}
      >
        Search
      </Button>
    </div>
  );
}

export default SeriesSearch;
