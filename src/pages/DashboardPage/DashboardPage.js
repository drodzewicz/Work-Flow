import React, { useState, useContext } from "react";
import BoardCard from "components/BoardCard/BoardCard";
import "./DashboardPage.scss";
import { ReactComponent as Pin } from "assets/images/pin-full.svg";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Pagination from "components/Pagination/Pagination";
import Button from "components/Button/Button";
import { ModalContext } from "context/ModalContext";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { NewBoard } from "modalForms";

function DashboardPage() {
  const [page, setPage] = useState({ currentPage: 1, amountOfPages: 10 });
  const [boards, setBoards] = useState([
    {
      id: "1bdwd",
      title: "Jeden liczmy po kolei",
      owner: { id: "kek123", username: "user1" },
      pinned: true,
    },
    {
      id: "dwdwd2",
      title: "klitarok eta rok grupa",
      owner: { id: "kek123", username: "user1" },
      pinned: true,
    },
    {
      id: "gt4dw2",
      title: "cos nowego ej ej",
      owner: { id: "kek123", username: "user1" },
      pinned: true,
    },
    {
      id: "fegg35",
      title: "piecdziesait",
      owner: { id: "kek123", username: "user1" },
      pinned: true,
    },
    {
      id: "fef3367ff",
      title: "solevita sok jablkowy",
      owner: { id: "kek123", username: "user1" },
      pinned: false,
    },
    {
      id: "346bdfefwd",
      title: "mnogoznal ne budet doszsc",
      owner: { id: "kek123", username: "user1" },
      pinned: false,
    },
    {
      id: "fef577",
      title: "budu smejatsa wsem na zlo",
      owner: { id: "kek123", username: "user1" },
      pinned: false,
    },
    {
      id: "fef224a4r",
      title: "koko xDDDD",
      owner: { id: "kek123", username: "user1" },
      pinned: false,
    },
    {
      id: "tttr456",
      title: "solevita sok jablkowy",
      owner: { id: "kek123", username: "user1" },
      pinned: false,
    },
    {
      id: "34yy46bdfefwd",
      title: "mnogoznal ne budet doszsc",
      owner: { id: "kek123", username: "user1" },
      pinned: false,
    },
    {
      id: "ttr45",
      title: "budu smejatsa wsem na zlo",
      owner: { id: "kek123", username: "user1" },
      pinned: false,
    },
    {
      id: "fef224a4ttr",
      title: "koko xDDDD",
      owner: { id: "kek123", username: "user1" },
      pinned: false,
    },
  ]);

  const [, modalDispatch] = useContext(ModalContext);

  const openCreateNewBoardModal = () => {
    modalDispatch({
      type: "OPEN",
      payload: { render: <NewBoard />, title: "New Board" },
    });
  };
  const pinnedBoards = () => {
    return boards
      .filter((b) => b.pinned)
      .map(({ id, owner, pinned, title }) => (
        <BoardCard
          key={id}
          isPinned={pinned}
          pinBoard={() => togglePinBoard(id)}
          boardTitle={title}
          owner={owner}
          boardId={id}
        />
      ));
  };
  const notPinnedBoards = () => {
    return boards
      .filter((b) => !b.pinned)
      .map(({ id, owner, pinned, title }) => (
        <BoardCard
          key={id}
          boardId={id}
          isPinned={pinned}
          pinBoard={() => togglePinBoard(id)}
          boardTitle={title}
          owner={owner}
        />
      ));
  };
  const togglePinBoard = (boardId) => {
    let tempBoards = [...boards];
    const foundBoardIndex = tempBoards.findIndex(
      (board) => board.id === boardId
    );
    tempBoards[foundBoardIndex].pinned = !tempBoards[foundBoardIndex].pinned;
    setBoards(tempBoards);
  };
  const changePage = (pageNumber) => {
    console.log(`fetching page [${pageNumber}]`);
    setPage({ ...page, currentPage: pageNumber });
  };

  return (
    <div className="dashboard-container">
      <div className="pinned-boards-container">
        <h1 className="board-container-title">
          <Pin />
          <span>Pinned</span>
        </h1>
        {pinnedBoards()}
      </div>
      <div className="board-container">
        <h1 className="board-container-title">
          <DashboardIcon />
          <span>Boards</span>
          <Button clicked={openCreateNewBoardModal} classes={["new-board-btn"]}>
            <AddBoxIcon />
            Create Board
          </Button>
        </h1>
        {notPinnedBoards()}
        {page.amountOfPages > 1 && (
          <Pagination
            amountOfPages={page.amountOfPages}
            currentPage={page.currentPage}
            handleChange={changePage}
          />
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
