import { TasksActionType, tasksState } from ".";

export interface SetTasks {
  type: TasksActionType.SET_TASKS;
  payload: {
    columns: tasksState[];
  };
}
export interface ChangeColumnName {
  type: TasksActionType.CHANGE_COLUMN_NAME;
  payload: {
    columnId: string;
    newName: string;
  };
}
export interface UpdateTask {
  type: TasksActionType.UPDATE_TASK;
  payload: {
    columnIndex: number;
    taskIndex: number;
    updatedTask: any;
  };
}
export interface MoveColumn {
  type: TasksActionType.MOVE_COLUMN;
  payload: {
    sourceIndex: number;
    destinationIndex: number;
  };
}
export interface MoveTask {
  type: TasksActionType.MOVE_TASK;
  payload: {
    column: {
      sourceIndex: number;
      destinationIndex: number;
    };
    task: {
      sourceIndex: number;
      destinationIndex: number;
    };
  };
}
export interface DeleteTask {
  type: TasksActionType.DELETE_TASK;
  payload: {
    columnIndex: number;
    taskIndex: number;
  };
}
export interface CreateTask {
  type: TasksActionType.CREATE_TASK;
  payload: {
    columnIndex: number;
    task: any;
  };
}
export interface DeleteColumn {
  type: TasksActionType.DELETE_COLUMN;
  payload: {
    columnIndex: number;
  };
}
export interface CreateColumn {
  type: TasksActionType.CREATE_COLUMN;
  payload: {
    newColumn: any;
  };
}

export type TaskActions =
  | SetTasks
  | UpdateTask
  | DeleteTask
  | CreateTask
  | MoveTask
  | MoveColumn
  | ChangeColumnName
  | DeleteColumn
  | CreateColumn;
