export type tasksState = {
  _id: string,
  name: string;
  tasks: any[];
};

export enum TasksActionType {
  SET_TASKS = "SET_TASKS",
  DELETE_TASK = "DELETE_TASK",
  UPDATE_TASK = "UPDATE_TASK",
  MOVE_TASK = "MOVE_TASK",
  CREATE_TASK = "CREATE_TASK",
  CREATE_COLUMN = "CREATE_COLUMN",
  DELETE_COLUMN = "DELETE_COLUMN",
  CHANGE_COLUMN_NAME = "CHANGE_COLUMN_NAME",
  MOVE_COLUMN = "MOVE_COLUMN",
}

export * from "./TaskContext";
