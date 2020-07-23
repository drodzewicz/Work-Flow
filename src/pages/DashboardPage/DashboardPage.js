import React, { useState } from 'react';
import BoardCard from "components/BoardCard/BoardCard";
import "./DashboardPage.scss";
import {ReactComponent as Pin } from "assets/images/pin-full.svg";
import DashboardIcon from '@material-ui/icons/Dashboard';
import Pagination from "components/Pagination/Pagination";

function DashboardPage() {
  const [page, setPage] = useState({currentPage: 1, amountOfPages: 10})
  const [boards, setBoards] = useState([
    { id: "1bdwd", title: "Jeden liczmy po kolei", pined: true },
    { id: "dwdwd2", title: "klitarok eta rok grupa", pined: true },
    { id: "gt4dw2", title: "cos nowego ej ej", pined: true },
    { id: "fegg35", title: "piecdziesait", pined: true },
    { id: "fef3367ff", title: "solevita sok jablkowy", pined: false },
    { id: "346bdfefwd", title: "mnogoznal ne budet doszsc", pined: false },
    { id: "fef577", title: "budu smejatsa wsem na zlo", pined: false },
    { id: "fef224a4r", title: "koko xDDDD", pined: false },
    { id: "tttr456", title: "solevita sok jablkowy", pined: false },
    { id: "34yy46bdfefwd", title: "mnogoznal ne budet doszsc", pined: false },
    { id: "ttr45", title: "budu smejatsa wsem na zlo", pined: false },
    { id: "fef224a4ttr", title: "koko xDDDD", pined: false },
  ]);

  const pinnedBoards = () => {
    return boards
      .filter(b => b.pined)
      .map(board => (
        <BoardCard
          key={board.id}
          isPinned={board.pined}
          pinBoard={() => togglePinBoard(board.id)}
          boardTitle={board.title}
          to={"board/1"} />
      ))
  }
  const notPinnedBoards = () => {
    return boards
      .filter(b => !b.pined)
      .map(board => (
        <BoardCard
          key={board.id}
          isPinned={board.pined}
          pinBoard={() => togglePinBoard(board.id)}
          boardTitle={board.title}
          to={"board/1"}
        />
      ))
  }

  const togglePinBoard = (boardId) => {
    let tempBoards = [...boards];
    const foundBoardIndex = tempBoards.findIndex(board => board.id === boardId);
    tempBoards[foundBoardIndex].pined = !tempBoards[foundBoardIndex].pined;
    setBoards(tempBoards);
  }
  const changePage = (pageNumber) => {
    console.log(`fetching page [${pageNumber}]`)
    setPage({...page, currentPage: pageNumber })
  }

  return (
    <div className="dashboard-container">
      <div className="pinned-boards-container">
        <h1 className="board-container-title">
          <Pin /><span>Pinned</span>
        </h1>
        {pinnedBoards()}
      </div>
      <div className="board-container">
        <h1 className="board-container-title">
          <DashboardIcon /><span>Boards</span>
        </h1>
        {notPinnedBoards()}
        {
          page.amountOfPages > 1 &&
          <Pagination amountOfPages={page.amountOfPages} currentPage={page.currentPage} handleChange={changePage} />
        }
      </div>
    </div>
  )
}

export default DashboardPage
