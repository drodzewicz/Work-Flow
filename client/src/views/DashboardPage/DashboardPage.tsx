import React, { useState, useContext, useEffect } from "react";
import "./DashboardPage.scss";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Button from "components/general/Button";
import BoardCreate from "components/modalForms/BoardEditor/BoardCreate";
import ContainerBox from "components/layout/ContainerBox/ContainerBox";
import { ModalContext, ModalActionType } from "context/ModalContext";
import { getPinnedBoards, getMyBoards, togglePinBoard } from "service";
import BoardContainer from "components/board/BoardContainer";
import { BoardI } from "types/general";
import { PaginationI } from "components/general/Pagination";

const DashboardPage: React.FC = () => {
  const [page, setPage] = useState<PaginationI>({ current: 1, total: 1 });
  const [pinnedBoards, setPinnedBoards] = useState<{ items: BoardI[]; isLoading: boolean }>({
    items: [],
    isLoading: false,
  });
  const [boards, setBoards] = useState<{ items: BoardI[]; isLoading: boolean }>({
    items: [],
    isLoading: false,
  });
  const { modalDispatch } = useContext(ModalContext);

  const setPinnedBoardLoading = (loadingState: boolean) => {
    setPinnedBoards((prevState) => ({ ...prevState, isLoading: loadingState }));
  };

  const setBoardsLoading = (loadingState: boolean) => {
    setBoards((prevState) => ({ ...prevState, isLoading: loadingState }));
  };
  useEffect(() => {
    const fetchBoards = async () => {
      const { data } = await getMyBoards({
        page: page.current,
        limit: 8,
        setLoading: setBoardsLoading,
      });
      if (!!data) {
        const { totalPageCount, boards } = data;
        setPage((pageState) => ({ ...pageState, total: totalPageCount || 0 }));
        setBoards((boardState) => ({ ...boardState, items: boards }));
      }
    };
    fetchBoards();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.current]);

  useEffect(() => {
    const fetchPinnedBoards = async () => {
      const { data, status } = await getPinnedBoards({ setLoading: setPinnedBoardLoading });
      if (!!data) {
        const {boards} = data;
        setPinnedBoards((prevState) => ({ ...prevState, items: boards }));
      }
    };
    fetchPinnedBoards();
    return () => {};
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

  const removeBoard = (boardId: string) => {
    setBoards((boards) => ({
      ...boards,
      items: boards.items.filter(({ _id }) => _id !== boardId),
    }));

    setPinnedBoards((boards) => ({
      ...boards,
      items: boards.items.filter(({ _id }) => _id !== boardId),
    }));
  };

  const pinBoard = (boardId: string) => {
    const boardIndex = boards.items.findIndex(({ _id }) => _id === boardId);
    setPinnedBoards((pinnedBoards) => {
      const tempPinnedBoards = [...pinnedBoards.items];
      tempPinnedBoards.push(boards.items[boardIndex]);
      return { ...pinnedBoards, items: tempPinnedBoards };
    });
    setBoards((boards) => {
      const modifiedBoards = [...boards.items];
      modifiedBoards[boardIndex].pinned = true;
      return { ...boards, items: modifiedBoards };
    });
  };

  const unpinBoard = (boardId: string) => {
    setPinnedBoards((boards) => ({
      ...boards,
      items: boards.items.filter(({ _id }) => _id !== boardId),
    }));
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

  const changePage = (pageNumber: number) => {
    setPage((pageState) => ({ ...pageState, current: pageNumber }));
  };

  return (
    <ContainerBox className="board-dashboard">
      {pinnedBoards.items.length > 0 && (
        <BoardContainer
          className="board-dashboard__pinned"
          title="Pinned"
          titleIcon="pinned"
          boards={pinnedBoards.items}
          isLoading={pinnedBoards.isLoading}
          removeBoard={removeBoard}
          togglePinBoard={togglePinBoardHandler}
          noBoardsMessage="you have no pinned boards"
        />
      )}
      <Button onClick={openCreateNewBoardModal} className="board-dashboard__new-btn">
        <AddBoxIcon />
        New Board
      </Button>
      <BoardContainer
        className="board-dashboard__main"
        title="Boards"
        titleIcon="board"
        boards={boards.items}
        isLoading={boards.isLoading}
        removeBoard={removeBoard}
        changePage={changePage}
        page={page}
        togglePinBoard={togglePinBoardHandler}
        noBoardsMessage="you are not a part of any board"
      />
    </ContainerBox>
  );
};

export default DashboardPage;
