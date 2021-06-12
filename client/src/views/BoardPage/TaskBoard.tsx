import React, { useContext, useEffect } from "react";
import DragableColumn from "components/board/Column/DraggableColumn/DragableColumn";
import { TaskContext, TasksActionType } from "context/TaskContext";
import { UserContext } from "context/UserContext";
import NewColumn from "components/board/NewColumn";
import { Droppable } from "react-beautiful-dnd";
import { ws } from "config/socket.conf";

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
      tasksDispatch({
        type: TasksActionType.MOVE_COLUMN,
        payload: {
          destinationIndex: moveResponse.destination,
          sourceIndex: moveResponse.source,
        },
      });
    };
    const createTask = (data: any) => {
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
    const deleteTask = (data: any) => {
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
    const moveTask = (data: any) => {
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
      ws.removeListener("deleteTask", deleteTask);
    };
  }, []);

  const isAuthorized = () => {
    const { role } = currentBoard;
    return role === "owner" || role === "admin";
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
