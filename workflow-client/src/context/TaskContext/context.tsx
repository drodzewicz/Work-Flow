import React, { PropsWithChildren, createContext, useReducer } from "react";

import { TaskActionsType } from "./types";

import taskReducer from "./reducer";

const INITIAL_STATE: { boardId: string; columns: ColumnWithTasks[] } = { boardId: "", columns: [] };

export const TaskContext = createContext<
  [{ boardId: string; columns: ColumnWithTasks[] }, React.Dispatch<TaskActionsType>]
>([INITIAL_STATE, () => null]);

export const TaskProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, INITIAL_STATE);

  return <TaskContext.Provider value={[state, dispatch]}>{children}</TaskContext.Provider>;
};
