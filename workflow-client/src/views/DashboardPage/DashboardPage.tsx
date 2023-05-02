import React, { useState, useContext, useEffect, useCallback, useRef } from "react";
import "./DashboardPage.scss";
import Button from "@/components/general/Button";
import BoardCreate from "@/dialogs/BoardEditor/BoardCreate";
import ContainerBox from "@/components/layout/ContainerBox/ContainerBox";
import { ModalContext, ModalActionType } from "@/context/ModalContext";
import { getPinnedBoards, getMyBoards, togglePinBoard } from "@/service";
import BoardContainer from "@/components/board/BoardContainer";
import { BoardI } from "@/types/general";
import LoadingOverlay from "@/components/layout/LoadingOverlay/LoadingOverlay";
import { ReactComponent as Pined } from "@/assets/images/pin-full.svg";
import { FaPlus } from "react-icons/fa";
import { FaColumns } from "react-icons/fa";
import { usePagination } from "@/Hooks/usePagination";

const DashboardPage: React.FC = () => {
  const { currentPage, totalPages, limit, setCurrentPage, setTotalPages } = usePagination({
    initialPage: 1,
    limit: 8,
  });

  const [pinnedBoards, setPinnedBoards] = useState<BoardI[]>([]);

  const [boards, setBoards] = useState<{ items: BoardI[]; isLoading: boolean }>({
    items: [],
    isLoading: false,
  });
  const isFirstBoardLoaded = useRef<boolean>(true);
  const { modalDispatch } = useContext(ModalContext);

  const setBoardsLoading = (loadingState: boolean) => {
    setBoards((prevState) => ({ ...prevState, isLoading: loadingState }));
  };
  const fetchBoards = useCallback(async () => {
    const { data } = await getMyBoards({
      page: currentPage,
      limit,
      setLoading: setBoardsLoading,
    });
    if (data) {
      const { totalPageCount, boards } = data;
      setTotalPages(totalPageCount || 1);
      setBoards((boardState) => ({ ...boardState, items: boards }));
    }
    if (isFirstBoardLoaded.current === true) {
      isFirstBoardLoaded.current = false;
    }
  }, [currentPage, limit, setTotalPages]);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  useEffect(() => {
    const fetchPinnedBoards = async () => {
      const { data } = await getPinnedBoards();
      if (data) {
        const { boards } = data;
        setPinnedBoards(boards);
      }
    };
    fetchPinnedBoards();
  }, []);

  const openCreateNewBoardModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: {
        render: <BoardCreate />,
        title: "Create new Board",
      },
    });
  };

  const removeBoard = async (boardId: string) => {
    await fetchBoards();

    setPinnedBoards((boards) => boards.filter(({ _id }) => _id !== boardId));
  };

  const pinBoard = (boardId: string) => {
    const boardIndex = boards.items.findIndex(({ _id }) => _id === boardId);
    setPinnedBoards((pinnedBoards) => {
      const tempPinnedBoards = [...pinnedBoards];
      tempPinnedBoards.push(boards.items[boardIndex]);
      return tempPinnedBoards;
    });
    setBoards((boards) => {
      const modifiedBoards = [...boards.items];
      modifiedBoards[boardIndex].pinned = true;
      return { ...boards, items: modifiedBoards };
    });
  };

  const unpinBoard = (boardId: string) => {
    setPinnedBoards((boards) => boards.filter(({ _id }) => _id !== boardId));
    setBoards((boards) => {
      const modifiedBoards = boards.items.map((board) => ({
        ...board,
        pinned: board._id === boardId ? false : board.pinned,
      }));
      return { ...boards, items: modifiedBoards };
    });
  };

  const togglePinBoardHandler = async (boardId: string) => {
    const { data } = await togglePinBoard({ boardId });
    if (!data) return;
    if (data.pinned) pinBoard(boardId);
    else unpinBoard(boardId);
  };

  return (
    <ContainerBox className="board-dashboard">
      {pinnedBoards.length > 0 && (
        <div>
          <h1 className="pinned-board-container-title">
            <Pined className="pinned-board-container-title__icon" /> Pinned
          </h1>
          <hr className="break-line" />
          <BoardContainer
            className="board-dashboard__pinned"
            boards={pinnedBoards}
            removeBoard={removeBoard}
            togglePinBoard={togglePinBoardHandler}
            noBoardsMessage="you have no pinned boards"
          />
        </div>
      )}
      <div className="board-container">
        <LoadingOverlay
          color={{ light: "245, 249, 249", dark: "51, 54, 55" }}
          opacity={isFirstBoardLoaded.current ? 1 : 0.7}
          className="board-container__loading"
          show={boards.isLoading}
        />
        <h1 className="board-container-title">
          <FaColumns className="board-container-title__icon" /> Boards
          <Button onClick={openCreateNewBoardModal} className="new-board-btn">
            <span className="new-board-btn__text">New Board</span>
            <FaPlus className="new-board-btn__icon" />
          </Button>
        </h1>
        <hr className="break-line" />
        <BoardContainer
          className="board-dashboard__main"
          boards={boards.items}
          removeBoard={removeBoard}
          changePage={setCurrentPage}
          page={{ current: currentPage, total: totalPages }}
          togglePinBoard={togglePinBoardHandler}
          noBoardsMessage="you are not a part of any board"
        />
      </div>
    </ContainerBox>
  );
};

export default DashboardPage;
