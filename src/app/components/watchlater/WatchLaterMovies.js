import React, { useState, useRef } from "react";
import "./css/WatchLater.css";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedMovie } from "../../../redux/movieSlice";
import { FixedSizeList } from "react-window";
import posterNotFound from "./../../../assets/no-image.jpg";
import deleteImg from "./../../../assets/delete.png";
import removeImg from "./../../../assets/remove.png";
import alertify from "alertifyjs";
import {
  deleteWatchLaterMovies,
  clearWatchLaterMovies,
} from "../../../redux/watchLaterMoviesSlice.js";
import { Tooltip } from "react-tooltip";
import { createSelector } from "reselect";

const selectWatchLaterMovies = createSelector(
  (state) => state.wlMovies.movies,
  (movies) => Object.values(movies)
);

function WatchLaterMovies() {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const wlMovies = useSelector(selectWatchLaterMovies);
  const dispatch = useDispatch();
  const listRef = useRef(null);

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

  const handleDeleteWatchLater = (movie) => {
    dispatch(deleteWatchLaterMovies(movie));
    alertify.set("notifier", "position", "top-center");
    alertify.success(movie.title + " removed from Watch later list.", 3);
  };

  const handleClearWatchLater = () => {
    dispatch(clearWatchLaterMovies());
    alertify.set("notifier", "position", "top-center");
    alertify.success("All list items are cleared.", 3);
  };

  const handleItemsRendered = ({ visibleStartIndex, visibleStopIndex }) => {
    setIsAtStart(visibleStartIndex === 0);
    setIsAtEnd(visibleStopIndex >= wlMovies.length - 1);
  };

  const MovieCard = ({ index, style }) => {
    const movie = wlMovies[index];
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
          onClick={() => handleDeleteWatchLater(movie)}
          alt="Delete"
          src={deleteImg}
          className="watch-later"
          data-tooltip-id={`delete-tooltip-${movie.id}`}
        />
        <Tooltip
          id={`delete-tooltip-${movie.id}`}
          place="top"
          content="Remove"
          variant="warning"
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

  return (
    <div className="movies-wrapper">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="cart-title">Watch Later Movies</h2>
        <img
          onClick={() => handleClearWatchLater()}
          alt="-"
          src={removeImg}
          className="clear-watch-later"
          data-tooltip-id={`clear-tooltip`}
        ></img>
        <Tooltip
          id={`clear-tooltip`}
          place="bottom"
          content="Clear list"
          variant="error"
        />
      </div>
      {wlMovies.length === 0 ? (
        <p className="empty">Empty list. What about surfing in the site?</p>
      ) : (
        <>
          {!isAtStart && (
            <button className="scroll-button left" onClick={scrollLeft}>
              &lt;
            </button>
          )}
          <div className="movies-container">
            <FixedSizeList
              ref={listRef}
              height={340}
              width={window.innerWidth - 40}
              itemSize={190}
              itemCount={wlMovies.length}
              layout="horizontal"
              onItemsRendered={handleItemsRendered}
            >
              {MovieCard}
            </FixedSizeList>
          </div>
          {!isAtEnd && (
            <button className="scroll-button right" onClick={scrollRight}>
              &gt;
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default WatchLaterMovies;
