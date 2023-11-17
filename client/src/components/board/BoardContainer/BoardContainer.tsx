import React from "react";

import Pagination, { PaginationI } from "@/components/general/Pagination/Pagination";

import * as Skeleton from "@/components/layout/Skeleton";

import BoardCard from "@/components/board/BoardCard";

import "./BoardContainer.scss";

export interface BoardContainerProps {
  boards: (Board & { isPinned: boolean })[];
  togglePinBoard: (boardId: string) => void;
  page?: PaginationI;
  changePage?: (page: number) => void;
  className?: string;
  noBoardsMessage?: string;
  numberOfLoadingItems: number;
  isLoading?: boolean;
}

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
      <Skeleton.Container
        show={isLoading}
        containerClassName="board-container__boards"
        count={numberOfLoadingItems}
        element={<Skeleton.Board />}
      >
        {boards.map(({ _id, name, isPinned }) => (
          <BoardCard
            key={`board-card-${_id}`}
            boardName={name}
            boardId={_id}
            isPinned={isPinned}
            pinBoard={() => togglePinBoard(_id)}
          />
        ))}
      </Skeleton.Container>
      {!boards && <i className="board-container__empty-message">{noBoardsMessage}</i>}
      {page && <Pagination {...page} className="board-container__pagination" handleChange={changePage} />}
    </div>
  );
};

export default BoardContainer;
