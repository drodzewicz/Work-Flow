import  { serviceParams } from "./general";

export interface getBoardMembersParams extends serviceParams {
  boardId: string;
  limit?: number;
  page?: number;
  username?: string;
}

export interface getBoardMemberParams extends serviceParams {
  boardId: string;
  userId: string
}

export interface removeUserFromBoardParams extends serviceParams {
  boardId: string;
  userId: string;
}

export interface addUserToBoardParams extends serviceParams {
  boardId: string;
  userId: string;
}

export interface changeBoardUserRoleParams extends serviceParams {
  boardId: string;
  userId: string;
  newRole: string;
}

export interface getLoggedInUserBoardRoleParams extends serviceParams {
  boardId: string;
  userId: string;
}