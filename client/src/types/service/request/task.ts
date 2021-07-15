import { serviceParams, socketServiceParams } from "./general";


export interface getBoardTaskParams extends serviceParams {
  boardId: string;
  taskId: string;
}

export interface updateBoardTaskParams extends serviceParams {
  boardId: string;
  taskId: string;
  payload: any;
}

export interface deleteTaskParams extends socketServiceParams {
  boardId: string;
  payload: {
    taskId: string;
  };
}

export interface moveTaskParams extends socketServiceParams {
  boardId: string;
  payload: {
    source: {
      columnIndex: number;
      taskIndex: number;
    };
    destination: {
      columnIndex: number;
      taskIndex: number;
    };
  };
}

export interface createTaskParams extends socketServiceParams {
  boardId: string;
  columnId: string;
  payload: any;
}