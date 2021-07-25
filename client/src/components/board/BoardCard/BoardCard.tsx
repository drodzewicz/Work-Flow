import React, { MouseEvent } from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as Pin } from "assets/images/pin-empty.svg";
import { ReactComponent as Pined } from "assets/images/pin-full.svg";
import "./BoardCard.scss";
import "./BoardCard-dark.scss";
import BoardOptions from "./BoardOptions/BoardOptions";
import { BoardcardProps } from "./";

const BoardCard: React.FC<BoardcardProps> = ({
  boardName,
  boardId,
  pinBoard,
  removeBoard,
  isPinned = false,
  isAuthor = false,
}) => {
  const history = useHistory();

  const togglePinBoard = (e: MouseEvent) => {
    e.stopPropagation();
    pinBoard();
  };

  const goToBoard = () => {
    history.push(`/board/${boardId}`);
  };

  return (
    <div aria-label="Board card" className="board-card">
      <div role="presentation" className="board-card__columns">
        <div className="board-card__columns__column"></div>
        <div className="board-card__columns__column"></div>
        <div className="board-card__columns__column"></div>
        <div className="board-card__columns__column"></div>
      </div>
      <div className="board-card__content">
        <h1 onClick={goToBoard} className="board-card__content__title">
          {boardName}
        </h1>
        <div className="board-card__content__menu">
          <span className="board-card__content__menu__icon" onClick={togglePinBoard}>
            {isPinned ? <Pined /> : <Pin />}
          </span>
          <BoardOptions boardId={boardId} removeBoardCallback={removeBoard} isAuthor={isAuthor} />
        </div>
      </div>
    </div>
  );
};

export default BoardCard;
