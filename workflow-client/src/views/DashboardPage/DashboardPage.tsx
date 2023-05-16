import React, { useState, useEffect } from "react";

import { BoardI } from "@/types/general";
import { OnSubmitType } from "@/types/general/utils";

import { BoardEditorType } from "@/dialogs/BoardEditor/types";

import { ReactComponent as Pined } from "@/assets/images/pin-full.svg";
import { createBoard, getMyBoards, getPinnedBoards, togglePinBoard } from "@/service";
import { FaPlus } from "react-icons/fa";
import { FaColumns } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { usePagination } from "@/hooks/usePagination";

import Button from "@/components/general/Button";

import ContainerBox from "@/components/layout/ContainerBox/ContainerBox";
import Modal from "@/components/layout/Modal";

import BoardContainer from "@/components/board/BoardContainer";

import BoardEditor from "@/dialogs/BoardEditor/BoardEditor";

import "./DashboardPage.scss";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const { currentPage, totalPages, limit, setCurrentPage, setTotalPages } = usePagination({
    initialPage: 1,
    initialTotal: 1,
    limit: 8,
  });

  const [showCreateNewBoardDialog, setShowCreateNewBoardDialog] = useState<boolean>(false);
  const [pinnedBoards, setPinnedBoards] = useState<BoardI[]>([]);
  const [boards, setBoards] = useState<BoardI[]>([]);

  const createBoardHandler: OnSubmitType<BoardEditorType> = async (values) => {
    const { data } = await createBoard({
      payload: { name: values.name, description: values.description || "" },
    });
    if (data) {
      navigate(`/board/${data?.board._id}`);
    }
  };

  useEffect(() => {
    const fetchPinnedBoards = async () => {
      const { data } = await getPinnedBoards();
      setPinnedBoards(data?.boards ?? []);
    };
    fetchPinnedBoards();
  }, []);

  const fetchBoards = async () => {
    const { data } = await getMyBoards({
      page: currentPage,
      limit,
    });
    if (data) {
      const { totalPageCount, boards } = data;
      setTotalPages(totalPageCount || 1);
      setBoards(boards);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, [currentPage, limit, setTotalPages]);

  const openCreateNewBoardModal = () => {
    setShowCreateNewBoardDialog(true);
  };
  const closeCreateNewBoardModal = () => {
    setShowCreateNewBoardDialog(false);
  };

  const removeBoard = async (boardId: string) => {
    await fetchBoards();
    setPinnedBoards((boards) => boards.filter(({ _id }) => _id !== boardId));
  };

  const pinBoard = (boardId: string) => {
    const boardIndex = boards.findIndex(({ _id }) => _id === boardId);
    setPinnedBoards((pinnedBoards) => {
      const tempPinnedBoards = [...pinnedBoards];
      tempPinnedBoards.push(boards[boardIndex]);
      return tempPinnedBoards;
    });
    setBoards((boards) => {
      const modifiedBoards = [...boards];
      modifiedBoards[boardIndex].pinned = true;
      return modifiedBoards;
    });
  };

  const unpinBoard = (boardId: string) => {
    setPinnedBoards((boards) => boards.filter(({ _id }) => _id !== boardId));
    setBoards((boards) => {
      const modifiedBoards = boards.map((board) => ({
        ...board,
        pinned: board._id === boardId ? false : board.pinned,
      }));
      return modifiedBoards;
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
      <Modal
        show={showCreateNewBoardDialog}
        title="Create new Board"
        size="s"
        onClose={closeCreateNewBoardModal}
      >
        <BoardEditor onSubmit={createBoardHandler} />
      </Modal>
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
          boards={boards}
          removeBoard={removeBoard}
          changePage={setCurrentPage}
          page={{
            current: currentPage,
            total: totalPages,
          }}
          togglePinBoard={togglePinBoardHandler}
          noBoardsMessage="you are not a part of any board"
        />
      </div>
    </ContainerBox>
  );
};

export default DashboardPage;
