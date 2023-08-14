import { Reducer } from "react";

import { TaskActionsType } from "./types";

import { TasksAction } from "./actions";

const reducer: Reducer<{ boardId: string; columns: ColumnWithTasks[] }, TaskActionsType> = (
  state,
  action
) => {
  switch (action.type) {
    case TasksAction.SET_TASKS: {
      return { ...state, columns: action.payload };
    }
    case TasksAction.SET_BOARD: {
      return { ...state, boardId: action.payload };
    }
    case TasksAction.MOVE_COLUMN: {
      const stateCopy = structuredClone(state);
      const [movingColumn] = stateCopy.columns.splice(action.payload.source, 1);
      stateCopy.columns.splice(action.payload.destination, 0, movingColumn);
      return stateCopy;
    }
    case TasksAction.MOVE_TASK: {
      const { source, destination } = action.payload;
      const stateCopy = structuredClone(state);
      const [movingTask] = stateCopy.columns[source[0]].tasks.splice(source[1], 1);
      stateCopy.columns[destination[0]].tasks.splice(destination[1], 0, movingTask);
      return stateCopy;
    }
    // case TasksAction.CHANGE_COLUMN_NAME: {
    //   const tempTasks = [...state];
    //   const foundColumnIndex = tempTasks.findIndex(({ _id }) => _id === action.payload.columnId);
    //   tempTasks[foundColumnIndex].name = action.payload.newName;
    //   return tempTasks;
    // }
    // case TasksAction.UPDATE_TASK: {
    //   const { columnIndex, updatedTask, taskIndex } = action.payload;
    //   const tempTasks = [...state];
    //   tempTasks[columnIndex].tasks[taskIndex] = updatedTask;
    //   return state;
    // }

    // case TasksAction.DELETE_TASK: {
    //   const newTasks = [...state];
    //   const { columnIndex, taskIndex } = action.payload;
    //   newTasks[columnIndex].tasks.splice(taskIndex, 1);
    //   return newTasks;
    // }
    // case TasksAction.CREATE_TASK: {
    //   const { columnIndex, task } = action.payload;
    //   const tempTasks = [...state];
    //   tempTasks[columnIndex].tasks.push(task);
    //   return tempTasks;
    // }
    // case TasksAction.DELETE_COLUMN: {
    //   const { columnIndex } = action.payload;
    //   const newTasks = [...state];
    //   newTasks.splice(columnIndex, 1);
    //   return newTasks;
    // }
    // case TasksAction.CREATE_COLUMN: {
    //   const { newColumn } = action.payload;
    //   const tempTasks = [...state];
    //   tempTasks.push(newColumn);
    //   return tempTasks;
    // }
    default:
      return state;
  }
};

export default reducer;
