import React, { createContext, Reducer, useReducer } from "react";
import { tasksState, TasksActionType } from ".";
import { TaskActions } from "./TaskActions";

const initialState: tasksState[] = [];

const reducer: Reducer<tasksState[], TaskActions> = (state, action) => {
  switch (action.type) {
    case TasksActionType.SET_TASKS:
      return action.payload.columns;
    case TasksActionType.CHANGE_COLUMN_NAME: {
      const tempTasks = [...state];
      const foundColumnIndex = tempTasks.findIndex(
        ({ _id }: any) => _id === action.payload.columnId
      );
      tempTasks[foundColumnIndex].name = action.payload.newName;
      return tempTasks;
    }
    case TasksActionType.UPDATE_TASK: {
      const { columnIndex, updatedTask, taskIndex } = action.payload;
      const tempTasks = [...state];
      tempTasks[columnIndex].tasks[taskIndex] = updatedTask;
      return state;
    }
    case TasksActionType.MOVE_COLUMN: {
      const tempTasks = [...state];
      const [movingColumn] = tempTasks.splice(action.payload.sourceIndex, 1);
      tempTasks.splice(action.payload.destinationIndex, 0, movingColumn);
      return tempTasks;
    }
    case TasksActionType.MOVE_TASK: {
      const { column, task } = action.payload;
      const tempTasks = [...state];
      const [movingTask] = tempTasks[column.sourceIndex].tasks.splice(task.sourceIndex, 1);
      tempTasks[column.destinationIndex].tasks.splice(task.destinationIndex, 0, movingTask);
      return tempTasks;
    }
    case TasksActionType.DELETE_TASK: {
      const newTasks = [...state];
      const { columnIndex, taskIndex } = action.payload;
      newTasks[columnIndex].tasks.splice(taskIndex, 1);
      return newTasks;
    }
    case TasksActionType.CREATE_TASK: {
      const { columnIndex, task } = action.payload;
      const tempTasks = [...state];
      tempTasks[columnIndex].tasks.push(task);
      return tempTasks;
    }
    case TasksActionType.DELETE_COLUMN: {
      const { columnIndex } = action.payload;
      const newTasks = [...state];
      newTasks.splice(columnIndex, 1);
      return newTasks;
    }
    case TasksActionType.CREATE_COLUMN: {
      const { newColumn } = action.payload;
      const tempTasks = [...state];
      tempTasks.push(newColumn);
      return tempTasks;
    }
    default:
      return state;
  }
};

export const TaskContext = createContext<{
  tasksState: tasksState[];
  tasksDispatch: React.Dispatch<TaskActions>;
}>({
  tasksState: initialState,
  tasksDispatch: () => undefined,
});

export const TaskProvider: React.FC = ({ children }) => {
  const [tasksState, tasksDispatch] = useReducer(reducer, initialState);

  return (
    <TaskContext.Provider value={{ tasksState, tasksDispatch }}>{children}</TaskContext.Provider>
  );
};
