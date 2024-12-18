import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { clearSelectedSerie } from "../../../redux/serieSlice";
import { clearSelectedMovie } from "../../../redux/movieSlice";
import { useGetSerieQuery, useGetMovieQuery } from "../../../api/apiSlice";
import "../common/css/Details.css";
import noImage from "../../../assets/no-image.jpg";
import FetchingModal from "../common/FetchingModal";
import VoteCard from "./VoteCard";

function ItemDetails({ type }) {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const isMovie = type === 1;

  const selectedMovie = useSelector((state) => state.movie.selectedMovie);
  const selectedSerie = useSelector((state) => state.serie.selectedSerie);

  const {
    data: movieDetails,
    error: movieError,
    isFetching: isFetchingMovie,
  } = useGetMovieQuery(
    { id: selectedMovie?.id },
    { skip: !isMovie || !selectedMovie }
  );

  const {
    data: serieDetails,
    error: serieError,
    isFetching: isFetchingSerie,
  } = useGetSerieQuery(
    { id: selectedSerie?.id },
    { skip: isMovie || !selectedSerie }
  );

  const selectedItem = isMovie ? selectedMovie : selectedSerie;
  const itemDetails = isMovie ? movieDetails : serieDetails;
  const error = isMovie ? movieError : serieError;
  const isFetching = isMovie ? isFetchingMovie : isFetchingSerie;

  const toggle = () => {
    setModal(!modal);
    if (modal) {
      isMovie ? dispatch(clearSelectedMovie()) : dispatch(clearSelectedSerie());
    }
  };

  useEffect(() => {
    if (selectedItem) {
      setModal(true);
    }
  }, [selectedItem]);

  if (error) {
    return <p>Bir hata oluştu!</p>;
  }

  return (
    <Modal isOpen={modal} toggle={toggle} size="lg" className="movie-modal">
      {isFetching ? (
        <FetchingModal isFetching={isFetching} />
      ) : (
        <>
          <ModalHeader toggle={toggle}>
            <span className="detail-title">
              {itemDetails?.title || itemDetails?.name}
            </span>
            <span className="release-year">
              &nbsp;(
              {isMovie
                ? itemDetails?.release_date?.split("-")[0]
                : itemDetails?.first_air_date?.split("-")[0] ||
                  "Year not available"}
              )
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="movie-details-container">
              <div className="movie-poster2">
                <img
                  src={
                    itemDetails?.poster_path
                      ? `https://image.tmdb.org/t/p/w300${itemDetails.poster_path}`
                      : noImage
                  }
                  alt="Poster not found"
                />
                <span className="release-date">
                  {isMovie
                    ? itemDetails?.release_date?.split("-").reverse().join("/")
                    : itemDetails?.first_air_date
                        ?.split("-")
                        .reverse()
                        .join("/") || "Date not available"}
                </span>
              </div>

              <div className="movie-info">
                <p>
                  <strong>Genres:</strong>{" "}
                  {itemDetails?.genres
                    ? itemDetails.genres.map((genre) => genre.name).join(", ")
                    : "Not available"}
                </p>
                <p>
                  <strong>Production Companies:</strong>{" "}
                  {itemDetails?.production_companies
                    ? itemDetails.production_companies
                        .map((company) => company.name)
                        .join(", ")
                    : "Not available"}
                </p>
                <p>
                  <strong>Overview:</strong>{" "}
                  {itemDetails?.overview || "Overview not available"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {itemDetails?.status || "Not available"}
                </p>

                {itemDetails?.status !==
                  (isMovie ? "Post Production" : "Planned") && (
                  <VoteCard
                    voteAverage={itemDetails?.vote_average || 0}
                    voteCount={itemDetails?.vote_count || 0}
                  />
                )}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={toggle}>
              Close
            </Button>
          </ModalFooter>
        </>
      )}
    </Modal>
  );
}

export default ItemDetails;
