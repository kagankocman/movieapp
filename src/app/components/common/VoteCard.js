import React from "react";
import "./css/VoteCard.css";

const VoteCard = ({ voteAverage, voteCount }) => {
  const circleStyle = {
    background: `conic-gradient(
      #ffc107 0% ${voteAverage * 10}%,
    #ffffff ${voteAverage * 10}% 100%
    )`,
  };

  return (
    <div className="vote-card">
      <div className="vote-circle" style={circleStyle}>
        <span className="vote-average">{voteAverage.toFixed(1)}</span>
      </div>
      <div className="vote-details">
        <span className="vote-count">{voteCount.toLocaleString()} votes</span>
      </div>
    </div>
  );
};

export default VoteCard;
