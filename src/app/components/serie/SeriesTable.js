import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetSeriesQuery } from "../../../api/apiSlice";
import { Spinner, Table } from "reactstrap";
import { setSelectedSerie } from "../../../redux/serieSlice";
import { addWatchLaterSeries } from "../../../redux/watchLaterSeriesSlice";
import watchLaterImg from "../../../assets/watchlater.png";
import "../common/css/Table.css";
import posterNotFound from "../../../assets/no-image.jpg";
import alertify from "alertifyjs";
import { Tooltip } from "react-tooltip";

function SeriesTable() {
  const { currentPage, queryTerm } = useSelector((state) => state.series);
  const dispatch = useDispatch();

  const { data, error, isFetching } = useGetSeriesQuery({
    search: queryTerm || "",
    page: currentPage,
  });

  const handleTitleClick = (serie) => {
    dispatch(setSelectedSerie({ id: serie.id }));
  };

  const handleWatchLater = (serie) => {
    dispatch(addWatchLaterSeries(serie));
    alertify.set("notifier", "position", "top-center");
    alertify.success(serie.name + " added to Watch later list.", 3);
  };

  if (isFetching) {
    return (
      <div className="div-spinner">
        <Spinner
          color="warning"
          style={{
            height: "5rem",
            width: "5rem",
          }}
        >
          Loading...
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <p>Bir hata oluştu!</p>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      {data?.results[0] && (
        <Table>
          <thead>
            <tr>
              <th>Poster</th>
              <th>Title</th>
              <th>Year</th>
              <th>Rating</th>
              <th>
                <img
                  style={{ width: "20px", height: "20px" }}
                  alt="+"
                  src={watchLaterImg}
                ></img>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((serie) => (
              <tr key={serie.id}>
                <td>
                  <img
                    src={
                      serie.poster_path
                        ? `https://image.tmdb.org/t/p/w200${serie.poster_path}`
                        : posterNotFound
                    }
                    alt={
                      serie?.poster_path
                        ? `${serie?.title} Poster`
                        : "Poster bulunamadı"
                    }
                    width="100"
                  />
                </td>
                <td
                  className="open-modal"
                  onClick={() => handleTitleClick(serie)}
                >
                  {serie?.name}
                </td>
                <td>{serie.first_air_date?.split("-")[0]}</td>
                <td>{serie.vote_average?.toFixed(1)}</td>
                <td
                  data-tooltip-id={`delete-tooltip-${serie.id}`}
                  className="td-wl"
                  onClick={() => handleWatchLater(serie)}
                >
                  +
                </td>
                <Tooltip
                  id={`delete-tooltip-${serie.id}`}
                  place="left-start"
                  content="Add to Watch later"
                />
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default SeriesTable;
