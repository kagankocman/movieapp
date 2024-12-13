import React from "react";
import { Spinner } from "reactstrap";
import "../css/FetchingModal.css";

const FetchingModal = ({ isFetching }) => {
  return (
    <div className="fetching-modal-content">
      <Spinner
        color="warning"
        style={{
          height: "5rem",
          width: "5rem",
        }}
      />
      <p>Please wait...</p>
    </div>
  );
};

export default FetchingModal;
