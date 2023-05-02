import React, { useRef, useContext } from "react";
import DropdownMenu from "@/components/general/DropdownMenu/DropdownMenu";
import DropdownMenuItem from "@/components/general/DropdownMenu/DropdownMenuItem";
import { FaEllipsisV, FaEdit, FaTrashAlt, FaSignOutAlt } from "react-icons/fa";
import { leaveBoard, deleteBoard } from "@/service";
import BoardUpdate from "@/dialogs/BoardEditor/BoardUpdate";
import { ModalContext, ModalActionType } from "@/context/ModalContext";
import { BoardOptionsProps } from "./";
import "./BoardOptions.scss";

const BoardOptions: React.FC<BoardOptionsProps> = ({ boardId, removeBoardCallback, isAuthor }) => {
  const moreOptionsAnchor = useRef<HTMLButtonElement>(null);
  const { modalDispatch } = useContext(ModalContext);

  const editEventModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: {
        title: "Edit Board",
        render: <BoardUpdate boardId={boardId} />,
      },
    });
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
      <button data-testid={`${boardId}-options`} className="board-options__ellipsis" ref={moreOptionsAnchor}>
        <FaEllipsisV />
      </button>
      <DropdownMenu
        data-testid="dropdown-menu"
        className="board-options__menu"
        anchorEl={moreOptionsAnchor}>
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
