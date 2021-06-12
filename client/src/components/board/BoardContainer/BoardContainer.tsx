import React from "react";
import LoadingOverlay from "components/layout/LoadingOverlay/LoadingOverlay";
import Pagination from "components/general/Pagination/Pagination";
import BoardCard from "components/board/BoardCard";
import { BoardContainerProps } from "./";
import "./BoardContainer.scss";

const BoardContainer: React.FC<BoardContainerProps> = ({
  title,
  boards,
  togglePinBoard,
  removeBoard,
  page,
  className,
  isLoading = false,
  changePage = () => undefined,
  noBoardsMessage = "empty",
}) => {
  return (
    <div className={`board-container ${className || ""}`}>
      <h1 className="board-container__title">{title}</h1>
      <LoadingOverlay show={isLoading} opacity={0}>
        <section className="board-container__boards">
          {boards.map(({ _id, pinned, name, description, members, isAuthor }, index) => (
            <BoardCard
              key={_id}
              boardId={_id}
              isPinned={pinned}
              pinBoard={() => togglePinBoard(index)}
              removeBoard={removeBoard}
              boardInfo={{ name, description, members }}
              isAuthor={isAuthor}
            />
          ))}
          {boards.length < 1 && (
            <div className="board-container__empty-message">{noBoardsMessage}</div>
          )}
        </section>
      </LoadingOverlay>
      {!!page && (
        <Pagination
          amountOfPages={page.amountOfPages}
          currentPage={page.currentPage}
          handleChange={changePage}
        />
      )}
    </div>
  );
};

export default BoardContainer;
