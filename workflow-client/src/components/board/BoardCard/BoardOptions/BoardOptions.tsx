import React, { useRef, useContext, useState } from "react";

import { BoardFullI } from "@/types/general";
import { OnSubmitType } from "@/types/general/utils";

import { BoardOptionsProps } from "./types";
import { BoardEditorType } from "@/dialogs/BoardEditor/types";

import { leaveBoard, deleteBoard, updateBoard, getBoard } from "@/service";
import { FaEllipsisV, FaEdit, FaTrashAlt, FaSignOutAlt } from "react-icons/fa";

import { AlertActionType, AlertContext } from "@/context/AlertContext";

import DropdownMenu from "@/components/general/DropdownMenu/DropdownMenu";
import DropdownMenuItem from "@/components/general/DropdownMenu/DropdownMenuItem";

import Modal from "@/components/layout/Modal";

import BoardEditor from "@/dialogs/BoardEditor/BoardEditor";

import "./BoardOptions.scss";

const BoardOptions: React.FC<BoardOptionsProps> = ({ boardId, removeBoardCallback, isAuthor }) => {
  const moreOptionsAnchor = useRef<HTMLButtonElement>(null);
  const { alertDispatch } = useContext(AlertContext);
  const [showEditBoardDialog, setShowEditBoardDialog] = useState<boolean>(false);
  const [boardData, setBoardData] = useState<BoardFullI | null>(null);

  const updateBoardHandler: OnSubmitType<BoardEditorType> = async (values) => {
    const { data } = await updateBoard({
      boardId: boardId,
      payload: values,
    });
    if (data) {
      alertDispatch({ type: AlertActionType.SUCCESS, payload: { message: data.message } });
      closeEditNewBoardModal();
    }
  };

  const editEventModal = async () => {
    const { data } = await getBoard({
      boardId: boardId,
      short: true,
    });
    if (data) {
      setBoardData(data);
      setShowEditBoardDialog(true);
    }
  };

  const closeEditNewBoardModal = () => {
    setShowEditBoardDialog(false);
  };

  const leavingEvent = async () => {
    const { error } = await leaveBoard({ boardId });
    if (!error) removeBoardCallback(boardId);
  };

  const deleteBoardHandler = async () => {
    const shouldDelete = window.confirm("are you sure you want to delete this board?");
    if (shouldDelete) {
      const { error } = await deleteBoard({ boardId });
      if (!error) removeBoardCallback(boardId);
    }
  };

  return (
    <div className="board-options">
      <Modal
        show={showEditBoardDialog}
        title="Edit Board"
        size="s"
        onClose={closeEditNewBoardModal}
      >
        <BoardEditor
          onSubmit={updateBoardHandler}
          initialValues={{ name: boardData?.name, description: boardData?.description }}
        />
      </Modal>
      <button
        data-testid={`${boardId}-options`}
        className="board-options__ellipsis"
        ref={moreOptionsAnchor}
      >
        <FaEllipsisV />
      </button>
      <DropdownMenu
        data-testid="dropdown-menu"
        className="board-options__menu"
        anchorEl={moreOptionsAnchor}
      >
        {isAuthor && (
          <DropdownMenuItem onClick={editEventModal}>
            <FaEdit /> Edit
          </DropdownMenuItem>
        )}
        {isAuthor && (
          <DropdownMenuItem onClick={deleteBoardHandler}>
            <FaTrashAlt /> Delete
          </DropdownMenuItem>
        )}
        {!isAuthor && (
          <DropdownMenuItem onClick={leavingEvent}>
            <FaSignOutAlt />
            Leave
          </DropdownMenuItem>
        )}
      </DropdownMenu>
    </div>
  );
};

export default BoardOptions;
