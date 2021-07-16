import { BoardI, BoardFullI } from "types/general";

export interface getMyBoardsResponse {
  boards: BoardI[];
  prev?: number;
  next?: number;
  totalPageCount?: number;
}
export interface createdBordResponse {
  board: BoardFullI;
  message: string;
}

export interface updateBoardresponse {
  message: string;
  boardId: string;
}

export interface togglePinBoardResponse {
  boardId: string;
  message: string;
  pinned: boolean;
}