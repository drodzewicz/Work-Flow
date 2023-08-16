import React from "react";

import { OnSubmitType } from "@/types/general/utils";

import { BoardEditorType } from "@/dialogs/BoardEditor/types";

import { ReactComponent as Pined } from "@/assets/images/pin-full.svg";
import { FaPlus } from "react-icons/fa";
import { FaColumns } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import useModal from "@/hooks/useModal";
import { usePagination } from "@/hooks/usePagination";

import useCreateBoard from "@/service/useCreateBoard";
import useFetchPinnedUserBoards from "@/service/useFetchPinnedUserBoards";
import useFetchUserBoards from "@/service/useFetchUserBoard";
import useTogglePinBoard from "@/service/useTogglePinBoard";

import Button from "@/components/general/Button";

import ContainerBox from "@/components/layout/ContainerBox/ContainerBox";
import Modal from "@/components/layout/Modal";

import BoardContainer from "@/components/board/BoardContainer";

import BoardEditor from "@/dialogs/BoardEditor/BoardEditor";

import "./DashboardPage.scss";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    show: showCreateNewBoardDialog,
    open: openCreateNewBoardModal,
    close: closeCreateNewBoardModal,
  } = useModal();

  const { data: pinnedBoards = [], isLoading: isPinnedBoardLoading } = useFetchPinnedUserBoards();

  const { currentPage, totalPages, limit, setCurrentPage, setTotalItems } = usePagination({
    initialPage: 1,
    limit: 8,
  });

  const { data: boardData = { boards: [], totalCount: 0 }, isLoading: isBoardLoading } =
    useFetchUserBoards({
      limit,
      page: currentPage,
      onSuccess: (data) => {
        setTotalItems(data.totalCount);
      },
    });

  const { mutate: createBoard } = useCreateBoard({
    onSuccess: (response) => {
      navigate(`/board/${response.data._id}`);
    },
  });
  const { mutate: togglePinBoard } = useTogglePinBoard();

  const boardsWithMetaData = (): (Board & { isPinned: boolean })[] => {
    return boardData.boards.map((board) => {
      const isPinned = !!pinnedBoards.find((pinnedBoard) => pinnedBoard._id === board._id);
      return { ...board, isPinned };
    });
  };

  const pinnedBoardsWithMetaData = (): (Board & { isPinned: boolean })[] => {
    return pinnedBoards.map((board) => ({ ...board, isPinned: true })) ?? [];
  };

  const createBoardHandler: OnSubmitType<BoardEditorType> = async (values) => {
    createBoard({ name: values.name, description: values.description || "" });
  };

  return (
    <>
      <ContainerBox className="board-dashboard">
        {pinnedBoards && (
          <div className="pinned-board-container">
            <h1 className="board-container-title">
              <Pined className="board-container-title__icon" /> Pinned
            </h1>
            <hr className="break-line" />
            <BoardContainer
              className="board-dashboard__pinned"
              noBoardsMessage="you have no pinned boards"
              boards={pinnedBoardsWithMetaData()}
              togglePinBoard={togglePinBoard}
              numberOfLoadingItems={4}
              isLoading={isPinnedBoardLoading}
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
      </ContainerBox>
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
