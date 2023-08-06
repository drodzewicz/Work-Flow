import React from "react";

import { BoardContainerProps } from "./types";

import Pagination from "@/components/general/Pagination/Pagination";

import BoardCard from "@/components/board/BoardCard";
import BoardCardLoading from "@/components/board/BoardCard/BoardCardLoading";

import "./BoardContainer.scss";

const BoardContainer: React.FC<BoardContainerProps> = ({
  boards,
  togglePinBoard,
  page,
  className,
  numberOfLoadingItems,
  isLoading = false,
  changePage = () => undefined,
  noBoardsMessage = "empty",
}) => {
  return (
    <div className={`board-container ${className || ""}`}>
      <section className="board-container__boards">
        {boards.map(({ _id, name, isPinned }) => (
          <BoardCard
            key={`board-card-${_id}`}
            boardId={_id}
            isPinned={isPinned}
            pinBoard={() => togglePinBoard(_id)}
            boardName={name}
            isAuthor={false}
          />
        ))}
        {isLoading &&
          [...Array(numberOfLoadingItems)].map((_, index) => <BoardCardLoading key={index} />)}
      </section>
      {!boards && <i className="board-container__empty-message">{noBoardsMessage}</i>}
      {page && <Pagination {...page} handleChange={changePage} />}
    </div>
  );
};

export default BoardContainer;
