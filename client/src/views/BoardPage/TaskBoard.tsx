import React, { useContext, useEffect } from "react";
import DragableColumn from "components/board/Column/DraggableColumn/DragableColumn";
import { TaskContext, TasksActionType } from "context/TaskContext";
import { UserContext } from "context/UserContext";
import NewColumn from "components/board/NewColumn";
import { Droppable } from "react-beautiful-dnd";
import { ws } from "config/socket.conf";
import { UserBoardRoles } from "types/general";

const TaskBoard: React.FC<{ boardId: string }> = ({ boardId }) => {
  const { tasksState, tasksDispatch } = useContext(TaskContext);
  const {
    userState: { currentBoard },
  } = useContext(UserContext);

  useEffect(() => {
    const createNewColumn = (newColumn: string) => {
      tasksDispatch({
        type: TasksActionType.CREATE_COLUMN,
        payload: {
          newColumn,
        },
      });
    };
    const deleteSocketColumn = (deleteResponse: any) => {
      tasksDispatch({
        type: TasksActionType.DELETE_COLUMN,
        payload: {
          columnIndex: deleteResponse.index,
        },
      });
    };
    const moveSocketColumn = (moveResponse: any) => {
      console.log(moveResponse);
      tasksDispatch({
        type: TasksActionType.MOVE_COLUMN,
        payload: {
          destinationIndex: moveResponse.destination,
          sourceIndex: moveResponse.source,
        },
      });
    };
    const createTask = (data: any) => {
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
    };
    const deleteTask = (data: any) => {
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
    };
    const moveTask = (data: any) => {
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
      ws.removeListener("deleteTask", deleteTask);
    };
  }, [tasksDispatch]);

  const isAuthorized = () => {
    const { role } = currentBoard;
    return role === UserBoardRoles.OWNER || role === UserBoardRoles.ADMIN;
  };

  return (
    <div className="task-board scrollbar">
      <Droppable droppableId="droppable" type="droppableColumn" direction="horizontal">
        {(provided) => {
          return (
            <div className="task-board__task-row" ref={provided.innerRef}>
              {tasksState.map(({ _id, name, tasks }, index) => (
                <DragableColumn
                  key={_id}
                  boardId={boardId}
                  columnId={_id}
                  columnName={name}
                  listOfTasks={tasks}
                  columnIndex={index}
                />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
      <div>{isAuthorized() && <NewColumn boardId={boardId} />}</div>
    </div>
  );
};

export default TaskBoard;
