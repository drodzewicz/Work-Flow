import { serviceParams } from "./general";

export interface getBoardTagsParams extends serviceParams {
  boardId: string;
}

export interface createBoardTagParams extends serviceParams {
  boardId: string;
  payload: {
    name: string;
    color: string;
  };
}

export interface updateBoardTagParams extends serviceParams {
  boardId: string;
  tagId: string;
  payload: {
    name: string;
    color: string;
  };
}

export interface deleteBoardTagParams extends serviceParams {
  boardId: string;
  tagId: string;
}
