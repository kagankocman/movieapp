import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetMoviesQuery } from "../../../api/apiSlice";
import { Spinner, Table } from "reactstrap";
import { setSelectedMovie } from "../../../redux/movieSlice";
import { addWatchLaterMovies } from "../../../redux/watchLaterMoviesSlice";
import "../common/css/Table.css";
import posterNotFound from "../../../assets/no-image.jpg";
import watchLaterImg from "../../../assets/watchlater.png";
import alertify from "alertifyjs";
import { Tooltip } from "react-tooltip";

function MoviesTable() {
  const { currentPage, queryTerm } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const { data, error, isFetching } = useGetMoviesQuery({
    search: queryTerm || "",
    page: currentPage,
  });

  const handleTitleClick = (movie) => {
    dispatch(setSelectedMovie({ id: movie.id }));
  };

  const handleWatchLater = (movie) => {
    dispatch(addWatchLaterMovies(movie));
    alertify.set("notifier", "position", "top-center");
    alertify.success(movie.title + " added to Watch later list.", 3);
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
            {data.results.map((movie) => (
              <tr key={movie.id}>
                <td>
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                        : posterNotFound
                    }
                    alt={
                      movie.poster_path
                        ? `${movie.title} Poster`
                        : "Poster bulunamadı"
                    }
                    width="100"
                  />
                </td>
                <td
                  className="open-modal"
                  onClick={() => handleTitleClick(movie)}
                >
                  {movie.title}
                </td>
                <td>{movie.release_date?.split("-")[0]}</td>
                <td>{movie.vote_average?.toFixed(1)}</td>
                <td
                  data-tooltip-id={`delete-tooltip-${movie.id}`}
                  className="td-wl"
                  onClick={() => handleWatchLater(movie)}
                >
                  +
                  <Tooltip
                    id={`delete-tooltip-${movie.id}`}
                    place="left-start"
                    content="Add to Watch later"
                    variant="dark"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default MoviesTable;
