import React, { useContext, useEffect } from "react";
import Column from "components/board/Column";
import { TaskContext, TasksActionType } from "context/TaskContext";
import { UserContext } from "context/UserContext";
import NewColumn from "components/board/NewColumn";
import PropTypes from "prop-types";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { ws } from "config/socket.conf";

const TaskBoard = ({ boardId }) => {
  const { tasksState, tasksDispatch } = useContext(TaskContext);
  const {
    userState: { currentBoard },
  } = useContext(UserContext);

  useEffect(() => {
    const createNewColumn = (newColumn) => {
      tasksDispatch({
        type: TasksActionType.CREATE_COLUMN,
        payload: {
          newColumn,
        },
      });
    };
    const deleteSocketColumn = (deleteResponse) => {
      tasksDispatch({
        type: TasksActionType.DELETE_COLUMN,
        payload: {
          columnIndex: deleteResponse.index,
        },
      });
    };
    const moveSocketColumn = (moveResponse) => {
      tasksDispatch({
        type: TasksActionType.MOVE_COLUMN,
        payload: {
          destinationIndex: moveResponse.destination,
          sourceIndex: moveResponse.source,
        },
      });
    };
    const createTask = (data) => {
      const { success, task } = data;
      if (success) {
        tasksDispatch({
          type: TasksActionType.CREATE_TASK,
          payload: {
            columnIndex: task.columnIndex,
            task,
          },
        });
      }
    };
    const deleteTask = (data) => {
      const { success, index } = data;
      if (success) {
        tasksDispatch({
          type: TasksActionType.DELETE_TASK,
          payload: {
            columnIndex: index.col,
            taskIndex: index.task,
          },
        });
      }
    };
    const moveTask = (data) => {
      const { success, source, destination } = data;
      if (success) {
        tasksDispatch({
          type: TasksActionType.MOVE_TASK,
          payload: {
            column: { sourceIndex: source.columnIndex, destinationIndex: destination.columnIndex },
            task: { sourceIndex: source.taskIndex, destinationIndex: destination.taskIndex },
          },
        });
      }
    };

    ws.on("createNewColumn", createNewColumn);
    ws.on("deleteColumn", deleteSocketColumn);
    ws.on("moveColumn", moveSocketColumn);
    ws.on("createTask", createTask);
    ws.on("deleteTask", deleteTask);
    ws.on("moveTask", moveTask);
    return () => {
      ws.removeListener("createNewColumn", createNewColumn);
      ws.removeListener("deleteColumn", deleteSocketColumn);
      ws.removeListener("moveColumn", moveSocketColumn);
      ws.removeListener("createTask", createTask);
      ws.removeListener("moveTask", moveTask);
    };
  }, []);

  const isAuthorized = () => {
    const { role } = currentBoard;
    return role === "owner" || role === "admin";
  };

  const DraggableTaskColumn = (id, name, tasks, index) => {
    return (
      <Draggable
        key={id}
        draggableId={id}
        index={index}
        isDragDisabled={currentBoard.role === "guest"}>
        {(provided, snapshot) => {
          return (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <Column
                key={id}
                columnId={id}
                columnIndex={index}
                columnName={name}
                listOfTasks={tasks}
                boardId={boardId}
              />
            </div>
          );
        }}
      </Draggable>
    );
  };

  return (
    <div className="board-page-container">
      <Droppable droppableId="droppable" type="droppableColumn" direction="horizontal">
        {(provided, snapshot) => {
          return (
            <div className="board-page-flex" ref={provided.innerRef}>
              {tasksState.map(({ _id, name, tasks }, index) =>
                DraggableTaskColumn(_id, name, tasks, index)
              )}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
      <div>{isAuthorized() && <NewColumn boardId={boardId} />}</div>
    </div>
  );
};

TaskBoard.propTypes = {
  boardId: PropTypes.string.isRequired,
};

export default TaskBoard;
