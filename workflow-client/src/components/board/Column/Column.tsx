import React, { useState, useContext, useRef } from "react";

import { UserBoardRoles } from "@/types/general";

import { ColumnProps } from "./types";

import { updateBoardColumn } from "@/service";
import { deleteColumn } from "@/service";
import { AxiosResponse } from "axios";
import { Droppable } from "react-beautiful-dnd";
import { FaRegPlusSquare, FaEllipsisV, FaTrashAlt, FaEdit } from "react-icons/fa";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { TaskContext, TasksActionType } from "@/context/TaskContext";

import useAuthClient from "@/hooks/useClient";

import DropdownMenu from "@/components/general/DropdownMenu/DropdownMenu";
import DropdownMenuItem from "@/components/general/DropdownMenu/DropdownMenuItem";

import Task from "@/components/board/Task";

import TaskCreate from "@/dialogs/TaskEditor/TaskCreate";

import "./Column.scss";

import ColumnNameInput from "./ColumnNameInput";

const Column: React.FC<ColumnProps> = ({
  columnName,
  columnId,
  columnIndex,
  boardId,
  listOfTasks,
}) => {
  const { tasksDispatch } = useContext(TaskContext);
  const currentBoard = "test";

  const [showTitleInput, setShowTitleInput] = useState<boolean>(false);

  const anchorElement = useRef(null);

  const client = useAuthClient();
  const params = useParams<{ id: string }>();
  const { data: tasks = [] } = useQuery<AxiosResponse<Column & { tasks: Task[] }>, unknown, Task[]>(
    ["board", params.id, "column", columnId],
    () => client.get("/tasks", { params: { boardId: params.id, columnId } }),
    {
      select: (response) => response.data?.tasks,
    }
  );

  const openBoardTagsModal = () => {
    // modalDispatch({
    //   type: ModalActionType.OPEN,
    //   payload: {
    //     render: <TaskCreate columnId={columnId} boardId={boardId} />,
    //     title: "New Task",
    //     size: "l",
    //   },
    // });
  };

  const removeColumn = async () => {
    const shouldDelete = window.confirm("are you sure you want to delete this column?");
    if (shouldDelete) {
      deleteColumn({ boardId, payload: { columnId, columnIndex } });
    }
  };

  const activateColumnNameEditInput = () => {
    setShowTitleInput(true);
  };
  const dissableColumnNameEditInput = () => {
    setShowTitleInput(false);
  };

  const changeColumnNameOnKeyPressEnter = async (newName: string) => {
    const { status } = await updateBoardColumn({
      boardId,
      columnId,
      payload: {
        name: newName,
      },
    });
    if (status === 200) {
      tasksDispatch({
        type: TasksActionType.CHANGE_COLUMN_NAME,
        payload: {
          columnId,
          newName,
        },
      });
      setShowTitleInput(false);
    }
  };

  const isAuthorized = () => {
    // return role === UserBoardRoles.ADMIN || role === UserBoardRoles.OWNER;
    return true;
  };

  return (
    <Droppable droppableId={columnId} type="droppableTaskToColumn">
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`task-column ${snapshot.isDraggingOver ? "task-column--active" : ""}`}
          >
            <header className="task-column__header">
              <span className="task-column__header__task-count">{tasks.length}</span>
              <ColumnNameInput
                hideInput={dissableColumnNameEditInput}
                initialVal={columnName}
                onEnter={changeColumnNameOnKeyPressEnter}
                editTitle={showTitleInput}
              />
              {/* currentBoard.role !== UserBoardRoles.GUEST  */}
              <button onClick={openBoardTagsModal} className="task-column__header__new-task-btn">
                <FaRegPlusSquare />
              </button>

              {isAuthorized() && (
                <>
                  <button ref={anchorElement} className="task-column__header__more-options">
                    <FaEllipsisV />
                  </button>
                  <DropdownMenu anchorEl={anchorElement} className="column-more-options">
                    <DropdownMenuItem onClick={removeColumn}>
                      <FaTrashAlt />
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={activateColumnNameEditInput}>
                      <FaEdit />
                      Edit
                    </DropdownMenuItem>
                  </DropdownMenu>
                </>
              )}
            </header>
            <div className="task-column__container scrollbar">
              {tasks?.map(({ _id, title, tags, assignees }, index) => (
                <Task
                  key={_id}
                  taskId={_id}
                  title={title}
                  tags={[]}
                  people={assignees}
                  indexes={{ taskIndex: index, columnIndex }}
                />
              ))}
              {provided.placeholder}
            </div>
          </div>
        );
      }}
    </Droppable>
  );
};

export default Column;
