import fetchData, { serviceParams, callAPI2 } from "./utils/fetchData";
import { BoardUserI, UserBoardRoles } from "types";

// MEMBERS - GET
interface getBoardMembersParams extends serviceParams {
  boardId: string;
  limit?: number;
  page?: number;
  username?: string;
}
type getBoardMembersResponse = {
  members: BoardUserI[];
  next?: number;
  prev?: number;
  totalPageCount?: number;
};
export const getBoardMembers = async ({
  boardId,
  limit = 8,
  page = 1,
  username,
  setLoading,
}: getBoardMembersParams) => {
  return await callAPI2<getBoardMembersResponse>({
    method: "GET",
    url: `/board/${boardId}/members`,
    query: {
      limit,
      page,
      username,
    },
    token: true,
    setLoading,
  });
};

// MEMBER - DELETE
interface removeUserFromBoardParams extends serviceParams {
  boardId: string;
  userId: string;
}
interface removeUserFromBoardResponse {
  message: string;
}
export const removeUserFromBoard = async ({
  boardId,
  userId,
  setLoading,
}: removeUserFromBoardParams) => {
  return await callAPI2<removeUserFromBoardResponse>({
    method: "DELETE",
    url: `/board/${boardId}/members/${userId}`,
    token: true,
    setLoading,
  });
};

// MEMBER - PATCH
interface addUserToBoardParams extends serviceParams {
  boardId: string;
  userId: string;
}
interface addUserToBoardResponse {
  message: string;
}
export const addUserToBoard = async ({ boardId, userId, setLoading }: addUserToBoardParams) => {
  return await callAPI2<addUserToBoardResponse>({
    method: "PATCH",
    url: `/board/${boardId}/members?userId=${userId}`,
    token: true,
    setLoading,
  });
};

// MEMBER ROLE - PATCH
interface changeBoardUserRoleParams extends serviceParams {
  boardId: string;
  userId: string;
  newRole: string;
}
interface changeBoardUserRoleResponse {
  message: string;
  role: UserBoardRoles;
}
export const changeBoardUserRole = async ({
  boardId,
  userId,
  newRole,
  setLoading,
}: changeBoardUserRoleParams) => {
  return await callAPI2<changeBoardUserRoleResponse>({
    method: "PATCH",
    url: `/board/${boardId}/members/${userId}?newRole=${newRole}`,
    token: true,
    setLoading,
  });
};

// LOGGEDIN USER ROLE - GET
interface getLoggedInUserBoardRoleParams extends serviceParams {
  boardId: string;
  userId: string;
}
interface getLoggedInUserBoardRoleResponse {
  member: {
    role: UserBoardRoles;
    user: string;
  };
}
export const getLoggedInUserBoardRole = async ({
  boardId,
  userId,
  setLoading,
}: getLoggedInUserBoardRoleParams) => {
  return await callAPI2<getLoggedInUserBoardRoleResponse>({
    method: "GET",
    url: `/board/${boardId}/members/${userId}`,
    token: true,
    setLoading,
  });
};
