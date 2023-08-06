import React from "react";

// import { useHistory } from "react-router-dom";
import "./BoardCard-dark.scss";
import "./BoardCard.scss";

const BoardCard: React.FC = () => {
  return (
    <div aria-label="coard-card-loading" className="board-card--loading">
      <div role="presentation" className="board-card--loading__columns">
        <div className="board-card--loading__columns__column"></div>
        <div className="board-card--loading__columns__column"></div>
        <div className="board-card--loading__columns__column"></div>
        <div className="board-card--loading__columns__column"></div>
      </div>
    </div>
  );
};

export default BoardCard;
