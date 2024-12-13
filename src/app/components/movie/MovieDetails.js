import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { clearSelectedMovie } from "../../../redux/movieSlice";
import { useGetMovieQuery } from "../../../api/apiSlice";
import "../common/css/Details.css";
import noImage from "../../../assets/no-image.jpg";
import FetchingModal from "../common/src/FetchingModal";
import VoteCard from "../common/src/VoteCard";

function MovieDetails() {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const selectedMovie = useSelector((state) => state.movie.selectedMovie);

  const {
    data: movieDetails,
    error,
    isFetching,
  } = useGetMovieQuery({ id: selectedMovie?.id }, { skip: !selectedMovie });

  const toggle = () => {
    setModal(!modal);
    if (modal) {
      dispatch(clearSelectedMovie());
    }
  };

  useEffect(() => {
    if (selectedMovie) {
      setModal(true);
    }
  }, [selectedMovie]);

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
            <span className="detail-title">{movieDetails?.title}</span>
            <span className="release-year">
              &nbsp;(
              {movieDetails?.release_date?.split("-")[0] ||
                "Year not available"}
              )
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="movie-details-container">
              <div className="movie-poster2">
                <img
                  src={
                    movieDetails?.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`
                      : noImage
                  }
                  alt="Poster not found"
                />
                <span className="release-date">
                  {movieDetails?.release_date
                    ? movieDetails.release_date.split("-").reverse().join("/")
                    : "Date not available"}
                </span>
              </div>

              <div className="movie-info">
                <p>
                  <strong>Genres:</strong>{" "}
                  {movieDetails?.genres
                    ? movieDetails.genres.map((genre) => genre.name).join(", ")
                    : "Not available"}
                </p>
                <p>
                  <strong>Production Companies:</strong>{" "}
                  {movieDetails?.production_companies
                    ? movieDetails.production_companies
                        .map((company) => company.name)
                        .join(", ")
                    : "Not available"}
                </p>
                <p>
                  <strong>Overview:</strong>{" "}
                  {movieDetails?.overview || "Overview not available"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {movieDetails?.status || "Not available"}
                </p>

                {movieDetails?.status !== "Post Production" && (
                  <VoteCard
                    voteAverage={movieDetails?.vote_average || 0}
                    voteCount={movieDetails?.vote_count || 0}
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

export default MovieDetails;
