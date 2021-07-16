import { serviceParams, socketServiceParams } from "./general";

export interface createColumnParams extends socketServiceParams {
  boardId: string;
  payload: {
    name: string;
  };
}

export interface deleteColumnParams extends socketServiceParams {
  boardId: string;
  payload: {
    columnId: string;
    columnIndex: number;
  };
}

export interface updateBoardColumnParams extends serviceParams {
  boardId: string;
  columnId: string;
  payload?: {
    name?: string;
  };
}


export interface moveColumnParams extends socketServiceParams {
  boardId: string;
  payload: {
    sourceIndex: number;
    destinationIndex: number;
  };
}