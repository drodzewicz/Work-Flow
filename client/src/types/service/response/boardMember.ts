import { BoardUserI, UserBoardRoles } from "types/general"; 

export type getBoardMembersResponse = {
  members: BoardUserI[];
  next?: number;
  prev?: number;
  totalPageCount?: number;
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