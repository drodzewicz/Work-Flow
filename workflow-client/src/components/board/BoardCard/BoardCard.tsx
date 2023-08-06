import React, { MouseEvent } from "react";

import { BoardcardProps } from "./types";

import { ReactComponent as Pin } from "@/assets/images/pin-empty.svg";
import { ReactComponent as Pined } from "@/assets/images/pin-full.svg";
import { useNavigate } from "react-router-dom";

// import { useHistory } from "react-router-dom";
import "./BoardCard-dark.scss";
import "./BoardCard.scss";


const BoardCard: React.FC<BoardcardProps> = ({
  boardName,
  boardId,
  pinBoard,
  isPinned = false,
  isAuthor = false,
}) => {
  const navigate = useNavigate();

  const togglePinBoard = (e: MouseEvent) => {
    e.stopPropagation();
    pinBoard();
  };

  const goToBoard = () => {
    navigate(`/board/${boardId}`);
  };

  return (
    <div onClick={goToBoard} aria-label="Board card" className="board-card">
      <div role="presentation" className="board-card__columns">
        <div className="board-card__columns__column"></div>
        <div className="board-card__columns__column"></div>
        <div className="board-card__columns__column"></div>
        <div className="board-card__columns__column"></div>
      </div>
      <div className="board-card__content">
        <h1 className="board-card__content__title">
          {boardName}
        </h1>
        <div className="board-card__content__menu">
          <span
            className="board-card__content__menu__icon"
            role="button"
            onClick={togglePinBoard}
            data-testid={`${boardId}-pin-btn`}
          >
            {isPinned ? (
              <Pined data-testid={`${boardId}-pinned`} />
            ) : (
              <Pin data-testid={`${boardId}-pin`} />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
