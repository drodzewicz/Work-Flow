import React, { useState, useContext, useRef } from "react";
import "./Column.scss";
import { FaRegPlusSquare, FaEllipsisV, FaTrashAlt, FaEdit } from "react-icons/fa";
import Task from "components/board/Task";
import DropdownMenu from "components/general/DropdownMenu/DropdownMenu";
import DropdownMenuItem from "components/general/DropdownMenu/DropdownMenuItem";
import { ModalContext, ModalActionType } from "context/ModalContext";
import { TaskContext, TasksActionType } from "context/TaskContext";
import { UserContext } from "context/UserContext";
import ColumnNameInput from "./ColumnNameInput";
import { updateBoardColumn } from "service";
import { deleteColumn } from "service";

import { Droppable } from "react-beautiful-dnd";

import TaskCreate from "components/modalForms/TaskEditor/TaskCreate";
import { ColumnProps } from "./";

const Column: React.FC<ColumnProps> = ({
  columnName,
  columnId,
  columnIndex,
  boardId,
  listOfTasks,
}) => {
  const { modalDispatch } = useContext(ModalContext);
  const { tasksDispatch } = useContext(TaskContext);
  const {
    userState: { currentBoard },
  } = useContext(UserContext);

  const [showTitleInput, setShowTitleInput] = useState<boolean>(false);

  const anchorElement = useRef(null);

  const openBoardTagsModal = () => {
    modalDispatch({
      type: ModalActionType.OPEN,
      payload: {
        render: <TaskCreate columnId={columnId} boardId={boardId} />,
        title: "New Task",
        size: "l",
      },
    });
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
    const { role } = currentBoard;
    return role === "ADMIN" || role === "OWNER";
  };

  return (
    <Droppable droppableId={columnId} type="droppableTaskToColumn">
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`task-column ${snapshot.isDraggingOver ? "task-column--active" : ""}`}>
            <header className="task-column__header">
              <span className="task-column__header__task-count">{listOfTasks.length}</span>
              <ColumnNameInput
                hideInput={dissableColumnNameEditInput}
                initialVal={columnName}
                onEnter={changeColumnNameOnKeyPressEnter}
                editTitle={showTitleInput}
              />
              {currentBoard.role !== "guest" && (
                <button onClick={openBoardTagsModal} className="task-column__header__new-task-btn">
                  <FaRegPlusSquare />
                </button>
              )}

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
              {listOfTasks &&
                listOfTasks.map(({ _id, title, tags, people }, index) => (
                  <Task
                    key={_id}
                    taskId={_id}
                    title={title}
                    tags={tags}
                    people={people}
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
