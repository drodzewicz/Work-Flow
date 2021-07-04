import React from "react";
import LoadingOverlay from "components/layout/LoadingOverlay/LoadingOverlay";
import Pagination from "components/general/Pagination/Pagination";
import BoardCard from "components/board/BoardCard";
import { BoardContainerProps } from "./";
import { ReactComponent as Pined } from "assets/images/pin-full.svg";
import DashboardIcon from "@material-ui/icons/Dashboard";

import "./BoardContainer.scss";

const BoardContainer: React.FC<BoardContainerProps> = ({
  title,
  titleIcon,
  boards,
  togglePinBoard,
  removeBoard,
  page,
  className,
  isLoading = false,
  changePage = () => undefined,
  noBoardsMessage = "empty",
}) => {
  const titleIconHandler = () => {
    switch (titleIcon) {
      case "pinned":
        return <Pined className="board-container__title-icon" />;
      case "board":
        return <DashboardIcon className="board-container__title-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className={`board-container ${className || ""}`}>
      <h1 className="board-container__title">
        {titleIconHandler()}
        {title}
      </h1>
      <LoadingOverlay show={isLoading} opacity={0}>
        <section className="board-container__boards">
          {boards.map(({ _id, pinned, name, description, members, isAuthor }) => (
            <BoardCard
              key={_id}
              boardId={_id}
              isPinned={pinned}
              pinBoard={() => togglePinBoard(_id)}
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
      {!!page && <Pagination {...page} handleChange={changePage} />}
    </div>
  );
};

export default BoardContainer;
