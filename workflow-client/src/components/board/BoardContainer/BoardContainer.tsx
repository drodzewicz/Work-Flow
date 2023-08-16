import React from "react";

import { BoardContainerProps } from "./types";

import Pagination from "@/components/general/Pagination/Pagination";

import * as Skeleton from "@/components/layout/Skeleton";

import BoardCard from "@/components/board/BoardCard";

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
    <div className={`board-container rr ${className || ""}`}>
      <Skeleton.Container
        show={isLoading}
        containerClassName="board-container__boards"
        count={numberOfLoadingItems}
        element={<Skeleton.Board />}
      >
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
      </Skeleton.Container>
      {!boards && <i className="board-container__empty-message">{noBoardsMessage}</i>}
      {page && <Pagination {...page} handleChange={changePage} />}
    </div>
  );
};

export default BoardContainer;
