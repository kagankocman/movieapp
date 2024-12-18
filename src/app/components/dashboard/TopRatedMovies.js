import React, { useState, useEffect, useRef } from "react";
import { useGetTopRatedMoviesQuery } from "../../../api/apiSlice.js";
import "./css/TopRated.css";
import { Spinner } from "reactstrap";
import { Tooltip } from "react-tooltip";
import { useSelector, useDispatch } from "react-redux";
import { addMovies } from "../../../redux/topRatedMoviesSlice.js";
import { setSelectedMovie } from "../../../redux/movieSlice.js";
import { FixedSizeList } from "react-window";
import posterNotFound from "../../../assets/no-image.jpg";
import watchLaterImg from "../../../assets/watchlater.png";
import { addWatchLaterMovies } from "../../../redux/watchLaterMoviesSlice.js";
import alertify from "alertifyjs";

function TopRatedMovies() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const topRatedMovies = useSelector((state) => state.topRatedMovies.movies);
  const dispatch = useDispatch();
  const { data, error, isFetching } = useGetTopRatedMoviesQuery(currentPage);
  const listRef = useRef(null);

  useEffect(() => {
    if (data?.results) {
      dispatch(addMovies(data.results));
    }
  }, [data, dispatch]);

  const handleItemsRendered = ({ visibleStartIndex, visibleStopIndex }) => {
    if (!isFetching && visibleStopIndex >= topRatedMovies.length - 2) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
    setIsAtStart(visibleStartIndex === 0);
    setIsAtEnd(visibleStopIndex >= topRatedMovies.length - 1);

    if (visibleStopIndex >= topRatedMovies.length - 2 && !isFetching) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleWatchLater = (movie) => {
    dispatch(addWatchLaterMovies(movie));
    alertify.set("notifier", "position", "top-center");
    alertify.success(movie.title + " added to Watch later list.", 3);
  };

  const scrollRight = () => {
    if (listRef.current) {
      const currentOffset = listRef.current.state.scrollOffset;
      const nextOffset = currentOffset + 190 * 5;
      listRef.current._outerRef.scrollTo({
        left: nextOffset,
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (listRef.current) {
      const currentOffset = listRef.current.state.scrollOffset;
      const prevOffset = Math.max(0, currentOffset - 190 * 5);
      listRef.current._outerRef.scrollTo({
        left: prevOffset,
        behavior: "smooth",
      });
    }
  };

  const MovieCard = ({ index, style }) => {
    const movie = topRatedMovies[index];
    if (!movie) return null;

    return (
      <div style={{ ...style, width: 170, height: 320 }} className="movie-card">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
              : posterNotFound
          }
          alt={movie.title}
          className="movie-poster"
        />
        <img
          onClick={() => handleWatchLater(movie)}
          alt="+"
          src={watchLaterImg}
          className="watch-later"
          data-tooltip-id={`delete-tooltip-${movie.id}`}
        ></img>
        <Tooltip
          id={`delete-tooltip-${movie.id}`}
          place="left"
          content="Add to Watch later"
          variant="dark"
        />
        <div className="movie-info">
          <h3
            className="movie-title"
            onClick={() => dispatch(setSelectedMovie({ id: movie.id }))}
            data-tooltip-id={`details-tooltip-${movie.id}`}
          >
            {movie.title}
          </h3>
          <Tooltip
            id={`details-tooltip-${movie.id}`}
            place="bottom"
            content="More info"
            variant="info"
          />
          <p className="movie-year">{movie.vote_average.toFixed(1)}</p>
        </div>
      </div>
    );
  };

  if (isFetching && currentPage === 1) {
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

  if (error) return <p>Bir hata oluştu!</p>;

  return (
    <div className="movies-wrapper">
      <h2 className="cart-title">Top Rated Movies</h2>
      {!isAtStart && (
        <button className="scroll-button left" onClick={scrollLeft}>
          &lt;
        </button>
      )}
      <div
        style={{
          opacity: isFetching ? 0.2 : 1,
        }}
        className="movies-container"
      >
        <FixedSizeList
          ref={listRef}
          height={340}
          width={window.innerWidth - 40}
          itemSize={190}
          itemCount={
            isFetching ? topRatedMovies.length + 2 : topRatedMovies.length
          }
          layout="horizontal"
          onItemsRendered={handleItemsRendered}
        >
          {MovieCard}
        </FixedSizeList>
        {isFetching && (
          <div className="spinner-overlay-local">
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
        )}
      </div>

      {!isAtEnd && (
        <button className="scroll-button right" onClick={scrollRight}>
          &gt;
        </button>
      )}
    </div>
  );
}

export default TopRatedMovies;
