import React from "react";
import { Button } from "reactstrap";
import { useGetSeriesQuery } from "../../../api/apiSlice";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../../../redux/seriesSlice";

function SeriesPagination() {
  const dispatch = useDispatch();
  const { currentPage, queryTerm } = useSelector((state) => state.series);

  const { data } = useGetSeriesQuery({
    search: queryTerm || "",
    page: currentPage,
  });

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Button
        color="warning"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ margin: "0 10px" }}
      >
        Önceki
      </Button>
      <span style={{ alignSelf: "center", fontSize: "1.2rem" }}>
        Page {currentPage}
      </span>
      <Button
        color="warning"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!data || !data.results || data.results.length < 10}
        style={{ margin: "0 10px" }}
      >
        Sonraki
      </Button>
    </div>
  );
}

export default SeriesPagination;
