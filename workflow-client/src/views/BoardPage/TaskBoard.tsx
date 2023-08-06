import React, { useContext, useCallback } from "react";

import { UserBoardRoles } from "@/types/general";

import { Droppable } from "react-beautiful-dnd";

import { TaskContext, TasksActionType } from "@/context/TaskContext";

// import { useWebSocketListener } from "@/hooks/useWebSocketListener";
import DragableColumn from "@/components/board/Column/DraggableColumn/DragableColumn";
import NewColumn from "@/components/board/NewColumn";

const TaskBoard: React.FC<{ columns: { _id: string; name: string }[] }> = ({ columns }) => {
  const { tasksState, tasksDispatch } = useContext(TaskContext);

  const createNewColumn = useCallback(
    (newColumn: string) => {
      tasksDispatch({
        type: TasksActionType.CREATE_COLUMN,
        payload: {
          newColumn,
        },
      });
    },
    [tasksDispatch]
  );
  const deleteSocketColumn = useCallback(
    (deleteResponse: any) => {
      tasksDispatch({
        type: TasksActionType.DELETE_COLUMN,
        payload: {
          columnIndex: deleteResponse.index,
        },
      });
    },
    [tasksDispatch]
  );
  const moveSocketColumn = useCallback(
    (moveResponse: any) => {
      tasksDispatch({
        type: TasksActionType.MOVE_COLUMN,
        payload: {
          destinationIndex: moveResponse.destination,
          sourceIndex: moveResponse.source,
        },
      });
    },
    [tasksDispatch]
  );
  const createTask = useCallback(
    (data: any) => {
      const { error, task, columnIndex } = data;
      if (!error) {
        tasksDispatch({
          type: TasksActionType.CREATE_TASK,
          payload: {
            columnIndex,
            task,
          },
        });
      }
    },
    [tasksDispatch]
  );
  const deleteTask = useCallback(
    (data: any) => {
      const { error, columnIndex, taskIndex } = data;
      if (!error) {
        tasksDispatch({
          type: TasksActionType.DELETE_TASK,
          payload: {
            columnIndex,
            taskIndex,
          },
        });
      }
    },
    [tasksDispatch]
  );
  const moveTask = useCallback(
    (data: any) => {
      const { error, source, destination } = data;
      if (!error) {
        tasksDispatch({
          type: TasksActionType.MOVE_TASK,
          payload: {
            column: { sourceIndex: source.columnIndex, destinationIndex: destination.columnIndex },
            task: { sourceIndex: source.taskIndex, destinationIndex: destination.taskIndex },
          },
        });
      }
    },
    [tasksDispatch]
  );

  // useWebSocketListener("createNewColumn", createNewColumn);
  // useWebSocketListener("deleteColumn", deleteSocketColumn);
  // useWebSocketListener("moveColumn", moveSocketColumn);
  // useWebSocketListener("createTask", createTask);
  // useWebSocketListener("deleteTask", deleteTask);
  // useWebSocketListener("moveTask", moveTask);

  const isAuthorized = () => {
    // return role === UserBoardRoles.OWNER || role === UserBoardRoles.ADMIN;
    return true;
  };

  return (
    <div className="task-board scrollbar">
      <Droppable droppableId="droppable" type="droppableColumn" direction="horizontal">
        {(provided) => {
          return (
            <div className="task-board__task-row" ref={provided.innerRef}>
              {columns.map(({ _id, name }, index) => (
                <DragableColumn
                  key={_id}
                  boardId={"lox"}
                  columnId={_id}
                  columnName={name}
                  listOfTasks={[]}
                  columnIndex={index}
                />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>

      <div>{isAuthorized() && <NewColumn boardId={"lox"} />}</div>
    </div>
  );
};

export default TaskBoard;
