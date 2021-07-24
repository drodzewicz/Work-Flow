import { BoardUserI, BoardUserFullI, UserBoardRoles } from "types/general"; 

export type getBoardMembersResponse = {
  members: BoardUserI[];
  next?: number;
  prev?: number;
  totalPageCount?: number;
};

export type getBoardMemberResponse = {
  member: BoardUserFullI;
};

export interface changeBoardUserRoleResponse {
  message: string;
  role: UserBoardRoles;
}

export interface getLoggedInUserBoardRoleResponse {
  member: {
    role: UserBoardRoles;
    user: string;
  };
}