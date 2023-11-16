import React, { useRef } from "react";

import { FaRegPlusSquare, FaEllipsisV, FaTrashAlt } from "react-icons/fa";

import useBoardId from "@/hooks/useBoardId";
import useModal from "@/hooks/useModal";
import useRBAC from "@/hooks/useRBAC";

import { useUpdateColumn, useDeleteColumn } from "@/service/column";
import { useCreateTask, useGetTasks } from "@/service/task";
import { emitWebSocket } from "@/service/utils/emitWebSocket";

import DropdownMenu from "@/components/general/DropdownMenu";
import DropdownMenuItem from "@/components/general/DropdownMenu/DropdownMenuItem";

import Modal from "@/components/layout/Modal";

import TaskEditor from "@/dialogs/TaskEditor";

import "./Column.scss";

import ColumnNameInput from "../ColumnNameInput";
import ColumnDraggable from "./ColumnDraggable";
import TaskContainer from "./TaskContainer";

export type ColumnProps = {
  columnName: string;
  columnId: string;
  columnIndex: number;
  placeholder?: any;
};

const Column: React.FC<ColumnProps> = (props) => {
  const boardId = useBoardId();
  const { columnName, columnId, columnIndex } = props;

  const { data = [] } = useGetTasks({ boardId });

  const {
    show: showCreateNewTaskModal,
    open: openCreateNewTaskModal,
    close: closeCreateNewTaskModal,
  } = useModal();

  const anchorElement = useRef(null);

  const canDeleteColumn = useRBAC({ boardId, action: "COLUMN_DELETE" });
  const canCreateColumn = useRBAC({ boardId, action: "COLUMN_CREATE" });
  const canCreateTask = useRBAC({ boardId, action: "TASK_CREATE" });

  const { mutate: createTask } = useCreateTask({
    boardId,
    onSuccess: () => {
      closeCreateNewTaskModal();
      emitWebSocket(boardId, { event: "task-update", type: "CREATE" });
    },
  });
  const { mutate: deleteColumn } = useDeleteColumn({
    boardId,
    onSuccess: () => {
      emitWebSocket(boardId, { event: "column-update", type: "DELETE" });
    },
  });
  const { mutate: updateColumn } = useUpdateColumn({
    boardId,
    columnId,
    onSuccess: () => {
      emitWebSocket(boardId, { event: "column-update", type: "UPDATE" });
    },
  });

  const removeColumn = async () => {
    const shouldDelete = window.confirm("Are you sure you want to delete this column?");
    if (shouldDelete) {
      deleteColumn(columnId);
    }
  };

  return (
    <ColumnDraggable {...props}>
      <div className="task-column">
        <header className="task-column__header">
          <span className="task-column__header__task-count">{data[columnIndex].tasks.length}</span>

          <ColumnNameInput value={columnName} onSubmit={updateColumn} disabled={!canCreateColumn} />
          {canCreateTask && (
            <>
              <button
                onClick={openCreateNewTaskModal}
                className="task-column__header__new-task-btn"
              >
                <FaRegPlusSquare />
              </button>
              <Modal
                show={showCreateNewTaskModal}
                title="Create new Task"
                size="l"
                onClose={closeCreateNewTaskModal}
              >
                <TaskEditor
                  columnId={columnId}
                  boardId={boardId}
                  onCancel={closeCreateNewTaskModal}
                  onSubmit={(values) => {
                    createTask(values);
                  }}
                />
              </Modal>
            </>
          )}
          {canDeleteColumn && (
            <>
              <button ref={anchorElement} className="task-column__header__more-options">
                <FaEllipsisV />
              </button>
              <DropdownMenu anchorEl={anchorElement} className="column-more-options">
                <DropdownMenuItem onClick={removeColumn}>
                  <FaTrashAlt />
                  Delete
                </DropdownMenuItem>
              </DropdownMenu>
            </>
          )}
        </header>
        <TaskContainer columnId={columnId} columnIndex={columnIndex} />
      </div>
    </ColumnDraggable>
  );
};

export default Column;
