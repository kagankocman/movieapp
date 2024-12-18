import React, { useState, useEffect, useRef } from "react";
import { useGetTrendingSeriesQuery } from "../../../api/apiSlice.js";
import "./css/TopRated.css";
import { Spinner } from "reactstrap";
import { Tooltip } from "react-tooltip";
import { useSelector, useDispatch } from "react-redux";
import { addSeries } from "../../../redux/trendingSeriesSlice.js";
import { setSelectedSerie } from "../../../redux/serieSlice.js";
import { FixedSizeList } from "react-window";
import posterNotFound from "../../../assets/no-image.jpg";
import watchLaterImg from "../../../assets/watchlater.png";
import { addWatchLaterSeries } from "../../../redux/watchLaterSeriesSlice.js";
import alertify from "alertifyjs";

function TrendingSeries() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const trendingSeries = useSelector((state) => state.trendingSeries.series);
  const dispatch = useDispatch();
  const { data, error, isFetching } = useGetTrendingSeriesQuery(currentPage);
  const listRef = useRef(null);

  useEffect(() => {
    if (data?.results) {
      dispatch(addSeries(data.results));
    }
  }, [data, dispatch]);

  const handleItemsRendered = ({ visibleStartIndex, visibleStopIndex }) => {
    if (!isFetching && visibleStopIndex >= trendingSeries.length - 2) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
    setIsAtStart(visibleStartIndex === 0);
    setIsAtEnd(visibleStopIndex >= trendingSeries.length - 1);

    if (visibleStopIndex >= trendingSeries.length - 2 && !isFetching) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleWatchLater = (movie) => {
    dispatch(addWatchLaterSeries(movie));
    alertify.set('notifier','position', 'top-center');
    alertify.success(movie.name + " added to Watch later list.", 3);
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

  const SerieCard = ({ index, style }) => {
    const serie = trendingSeries[index];
    if (!serie) return null;

    return (
      <div style={{ ...style, width: 170, height: 320 }} className="movie-card">
        <img
          src={
            serie.poster_path
              ? `https://image.tmdb.org/t/p/w200${serie.poster_path}`
              : posterNotFound
          }
          alt={serie.title}
          className="movie-poster"
        />
        <img
          onClick={() => handleWatchLater(serie)}
          alt="+"
          src={watchLaterImg}
          className="watch-later"
          data-tooltip-id={`delete-tooltip-${serie.id}`}
        ></img>
        <Tooltip
          id={`delete-tooltip-${serie.id}`}
          place="left"
          content="Add to Watch later"
          variant="dark"
        />
        <div className="movie-info">
          <h3
            className="movie-title"
            onClick={() => dispatch(setSelectedSerie({ id: serie.id }))}
            data-tooltip-id={`details-tooltip-${serie.id}`}
          >
            {serie.name}
          </h3>
          <Tooltip
          id={`details-tooltip-${serie.id}`}
          place="bottom"
          content="More info"
          variant="info"
        />
          <p className="movie-year">{serie.vote_average.toFixed(1)}</p>
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
      <h2 className="cart-title">Trending Series</h2>
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
            isFetching ? trendingSeries.length + 2 : trendingSeries.length
          }
          layout="horizontal"
          onItemsRendered={handleItemsRendered}
        >
          {SerieCard}
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

export default TrendingSeries;
