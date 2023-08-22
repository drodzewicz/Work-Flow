import React, { useRef } from "react";

import { ColumnProps } from "./types";

import { FaRegPlusSquare, FaEllipsisV, FaTrashAlt } from "react-icons/fa";
import { useQueryClient } from "react-query";

import useBoardTask from "@/hooks/useBoardTasks";
import useModal from "@/hooks/useModal";

import useCreateTask from "@/service/useCreateTask";
import useDeleteColumn from "@/service/useDeleteColumn";
import useUpdateColumn from "@/service/useUpdateColumn";

import DropdownMenu from "@/components/general/DropdownMenu/DropdownMenu";
import DropdownMenuItem from "@/components/general/DropdownMenu/DropdownMenuItem";

import Modal from "@/components/layout/Modal";

import TaskEditor from "@/dialogs/TaskEditor/TaskEditor";

import "./Column.scss";

import ColumnNameInput from "../ColumnNameInput/ColumnNameInput";
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

  const { mutate: createTask } = useCreateTask({ boardId });

  const { mutate: deleteColumn } = useDeleteColumn({
    boardId,
    onSuccess: () => {
      queryClient.invalidateQueries(["board", boardId]);
    },
  });

  const { mutate: updateColumn } = useUpdateColumn({ boardId, columnId });

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
          <span className="task-column__header__task-count">
            {data.columns[columnIndex].tasks.length}
          </span>

          <ColumnNameInput value={columnName} onSubmit={updateColumn} />
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
            <TaskEditor columnId={columnId} boardId={boardId} onSubmit={createTask} />
          </Modal>
        </header>
        <TaskContainer columnId={columnId} columnIndex={columnIndex} />
      </div>
    </ColumnDraggable>
  );
};

export default Column;
