import React from "react";

import { BoardContainerProps } from "./types";

import Pagination from "@/components/general/Pagination/Pagination";

import BoardCard from "@/components/board/BoardCard";

import "./BoardContainer.scss";

const BoardContainer: React.FC<BoardContainerProps> = ({
  boards,
  togglePinBoard,
  removeBoard,
  page,
  className,
  changePage = () => undefined,
  noBoardsMessage = "empty",
}) => {
  return (
    <div className={`board-container ${className || ""}`}>
      <section className="board-container__boards">
        {boards.map(({ _id, pinned, name, isAuthor }) => (
          <BoardCard
            key={_id}
            boardId={_id}
            isPinned={pinned}
            pinBoard={() => togglePinBoard(_id)}
            removeBoard={removeBoard}
            boardName={name}
            isAuthor={isAuthor}
          />
        ))}
      </section>
      {boards.length < 1 && <i className="board-container__empty-message">{noBoardsMessage}</i>}
      {!!page && <Pagination {...page} handleChange={changePage} />}
    </div>
  );
};

export default BoardContainer;
