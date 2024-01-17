import React, { useMemo } from "react";

import { OnSubmitType } from "@/types/utils";

import { ReactComponent as Pined } from "@/assets/images/pin-full.svg";
import { FaPlus } from "react-icons/fa";
import { FaColumns } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { usePagination } from "@/hooks/usePagination";

import { useCreateBoard } from "@/service/board";
import { useTogglePinBoard, useGetUserPinnedBoards, useGetUserBoards } from "@/service/self";

import Box from "@/components/layout/Box";
import Modal from "@/components/layout/Modal";

import BoardContainer from "@/components/board/BoardContainer";

import BoardEditor, { BoardEditorType } from "@/dialogs/BoardEditor/BoardEditor";

import "./DashboardPage.scss";
import useBoolean from "@/hooks/useBoolean";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    state: showCreateNewBoardDialog,
    setTrue: openCreateNewBoardModal,
    setFalse: closeCreateNewBoardModal,
  } = useBoolean(false);

  const { data: pinnedBoards = [], isLoading: isPinnedBoardLoading } = useGetUserPinnedBoards();

  const { currentPage, totalPages, limit, setCurrentPage, setTotalItems } = usePagination({
    initialPage: 1,
    limit: 8,
  });

  const { data: boardData = { boards: [], totalCount: 0 }, isLoading: isBoardLoading } =
    useGetUserBoards({
      limit,
      page: currentPage,
      keepPreviousData: true,
      onSuccess: (data) => {
        setTotalItems(data.totalCount);
      },
    });

  const { mutate: createBoard } = useCreateBoard({
    onSuccess: (response) => {
      navigate(`/board/${response._id}`);
    },
  });
  const { mutate: togglePinBoard } = useTogglePinBoard();

  const boardsWithMetaData = (): (Board & { isPinned: boolean })[] => {
    return boardData.boards.map((board) => {
      const isPinned = !!pinnedBoards.find((pinnedBoard) => pinnedBoard._id === board._id);
      return { ...board, isPinned };
    });
  };

  const pinnedBoardsWithMetaData = useMemo(() => {
    return pinnedBoards.map((board) => ({ ...board, isPinned: true })) ?? [];
  }, [pinnedBoards]);

  const createBoardHandler: OnSubmitType<BoardEditorType> = async (values) => {
    createBoard({ name: values.name, description: values.description || "" });
  };

  return (
    <>
      <Box className="board-dashboard">
        {pinnedBoards && (
          <div className="board-container-section">
            <h1 className="board-container-title">
              <Pined className="board-container-title__icon" /> Pinned
            </h1>
            <hr className="break-line" />
            <BoardContainer
              className="board-dashboard__pinned"
              noBoardsMessage="you have no pinned boards"
              boards={pinnedBoardsWithMetaData}
              togglePinBoard={togglePinBoard}
              numberOfLoadingItems={4}
              isLoading={isPinnedBoardLoading}
            />
          </div>
        )}
        <div className="board-container-section">
          <h1 className="board-container-title">
            <FaColumns className="board-container-title__icon" /> Boards
            <button onClick={openCreateNewBoardModal} className="btn new-board-btn">
              <div className="new-board-btn__text">New Board</div>
              <FaPlus className="new-board-btn__icon" />
            </button>
          </h1>
          <hr className="break-line" />
          <BoardContainer
            isLoading={isBoardLoading}
            numberOfLoadingItems={limit}
            className="board-dashboard__main"
            noBoardsMessage="you are not a part of any board"
            boards={boardsWithMetaData()}
            changePage={setCurrentPage}
            togglePinBoard={togglePinBoard}
            page={{
              current: currentPage,
              total: totalPages,
            }}
          />
        </div>
      </Box>
      <Modal
        show={showCreateNewBoardDialog}
        title="Create new Board"
        size="s"
        onClose={closeCreateNewBoardModal}
      >
        <BoardEditor onSubmit={createBoardHandler} />
      </Modal>
    </>
  );
};

export default DashboardPage;
