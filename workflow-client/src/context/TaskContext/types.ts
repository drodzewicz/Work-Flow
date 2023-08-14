import { TasksAction } from "./actions";

type SetTasks = {
  type: TasksAction.SET_TASKS;
  payload: ColumnWithTasks[];
};

type SetBoard = {
  type: TasksAction.SET_BOARD;
  payload: string;
};

type ChangeColumnName = {
  type: TasksAction.CHANGE_COLUMN_NAME;
  payload: {
    columnId: string;
    newName: string;
  };
};

type UpdateTask = {
  type: TasksAction.UPDATE_TASK;
  payload: {
    columnIndex: number;
    taskIndex: number;
    updatedTask: any;
  };
};

type MoveColumn = {
  type: TasksAction.MOVE_COLUMN;
  payload: {
    source: number;
    destination: number;
  };
};

type MoveTask = {
  type: TasksAction.MOVE_TASK;
  payload: {
    source: [number, number];
    destination: [number, number];
  };
};

type DeleteTask = {
  type: TasksAction.DELETE_TASK;
  payload: {
    columnIndex: number;
    taskIndex: number;
  };
};

type CreateTask = {
  type: TasksAction.CREATE_TASK;
  payload: {
    columnIndex: number;
    task: any;
  };
};

type DeleteColumn = {
  type: TasksAction.DELETE_COLUMN;
  payload: {
    columnIndex: number;
  };
};

type CreateColumn = {
  type: TasksAction.CREATE_COLUMN;
  payload: {
    newColumn: any;
  };
};

export type TaskActionsType =
  | SetTasks
  | SetBoard
  | UpdateTask
  | DeleteTask
  | CreateTask
  | MoveTask
  | MoveColumn
  | ChangeColumnName
  | DeleteColumn
  | CreateColumn;
