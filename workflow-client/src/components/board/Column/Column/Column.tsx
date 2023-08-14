import React, { useRef } from "react";

import { ColumnProps } from "./types";

import * as Skeleton from "@/components/Skeleton";
import { updateBoardColumn } from "@/service";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FaRegPlusSquare, FaEllipsisV, FaTrashAlt, FaEdit } from "react-icons/fa";
import { useQueryClient } from "react-query";

import useBoardTask from "@/hooks/useBoardTasks";
import useModal from "@/hooks/useModal";

import useDeleteColumn from "@/service/useDeleteColumn";
import useFetchTasks from "@/service/useFetchTasks";

import DropdownMenu from "@/components/general/DropdownMenu/DropdownMenu";
import DropdownMenuItem from "@/components/general/DropdownMenu/DropdownMenuItem";

import Modal from "@/components/layout/Modal";

import Task from "@/components/board/Task";

import TaskCreate from "@/dialogs/TaskEditor/TaskCreate";

import "./Column.scss";

import ColumnDraggable from "./ColumnDraggable";
import TaskContainer from "./TaskContainer";

const Column: React.FC<ColumnProps> = (props) => {
  const { columnName, columnId, columnIndex, boardId } = props;

  const { data } = useBoardTask();

  const {
    show: showCreateNewTaskModal,
    open: openCreateNewTaskModal,
    close: closeCreateNewTaskModal,
  } = useModal();

  const anchorElement = useRef(null);

  const queryClient = useQueryClient();

  const { mutate: deleteColumn } = useDeleteColumn({
    boardId,
    onSuccess: () => {
      queryClient.invalidateQueries(["board", boardId]);
    },
  });

  const removeColumn = async () => {
    const shouldDelete = window.confirm("are you sure you want to delete this column?");
    if (shouldDelete) {
      deleteColumn(columnId);
    }
  };

  return (
    <ColumnDraggable {...props}>
      <div className="task-column">
        <header className="task-column__header">
          <span className="task-column__header__task-count">{data.columns[columnIndex].tasks.length}</span>

          <input value={columnName} />
          <button onClick={openCreateNewTaskModal} className="task-column__header__new-task-btn">
            <FaRegPlusSquare />
          </button>

          <button ref={anchorElement} className="task-column__header__more-options">
            <FaEllipsisV />
          </button>
          <DropdownMenu anchorEl={anchorElement} className="column-more-options">
            <DropdownMenuItem onClick={removeColumn}>
              <FaTrashAlt />
              Delete
            </DropdownMenuItem>
          </DropdownMenu>
          <Modal
            show={showCreateNewTaskModal}
            title="Create new Task"
            size="l"
            onClose={closeCreateNewTaskModal}
          >
            <TaskCreate columnId={columnId} boardId={boardId} />
          </Modal>
        </header>
        <TaskContainer columnId={columnId} columnIndex={columnIndex} />
      </div>
    </ColumnDraggable>
  );
};

export default Column;
