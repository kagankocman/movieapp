import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { clearSelectedSerie } from "../../../redux/serieSlice";
import { useGetSerieQuery } from "../../../api/apiSlice";
import "../common/css/Details.css";
import noImage from "../../../assets/no-image.jpg";
import FetchingModal from "../common/src/FetchingModal";
import VoteCard from "../common/src/VoteCard";

function SerieDetails() {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const selectedSerie = useSelector((state) => state.serie.selectedSerie);

  const {
    data: serieDetails,
    error,
    isFetching,
  } = useGetSerieQuery({ id: selectedSerie?.id }, { skip: !selectedSerie });

  const toggle = () => {
    setModal(!modal);
    if (modal) {
      dispatch(clearSelectedSerie());
    }
  };

  useEffect(() => {
    if (selectedSerie) {
      setModal(true);
    }
  }, [selectedSerie]);

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
            <span className="detail-title">{serieDetails?.name}</span>
            <span className="release-year">
              &nbsp;(
              {serieDetails?.first_air_date?.split("-")[0] ||
                "Year not available"}
              )
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="movie-details-container">
              <div className="movie-poster2">
                <img
                  src={
                    serieDetails?.poster_path
                      ? `https://image.tmdb.org/t/p/w300${serieDetails.poster_path}`
                      : noImage
                  }
                  alt="Poster not found"
                />
                <span className="release-date">
                  {serieDetails?.first_air_date
                    ? serieDetails.first_air_date.split("-").reverse().join("/")
                    : "Date not available"}
                </span>
              </div>

              <div className="movie-info">
                <p>
                  <strong>Genres:</strong>{" "}
                  {serieDetails?.genres
                    ? serieDetails.genres.map((genre) => genre.name).join(", ")
                    : "Not available"}
                </p>
                <p>
                  <strong>Production Companies:</strong>{" "}
                  {serieDetails?.production_companies
                    ? serieDetails.production_companies
                        .map((company) => company.name)
                        .join(", ")
                    : "Not available"}
                </p>
                <p>
                  <strong>Overview:</strong>{" "}
                  {serieDetails?.overview || "Overview not available"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {serieDetails?.status || "Not available"}
                </p>

                {serieDetails?.status !== "Planned" && (
                  <VoteCard
                    voteAverage={serieDetails?.vote_average || 0}
                    voteCount={serieDetails?.vote_count || 0}
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

export default SerieDetails;
