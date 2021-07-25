import callAPI from "./utils/fetchData";

import {
  getBoardMembersParams,
  removeUserFromBoardParams,
  addUserToBoardParams,
  changeBoardUserRoleParams,
  getLoggedInUserBoardRoleParams,
  getBoardMemberParams
} from "types/service/request";
import {
  getBoardMembersResponse,
  GeneralResponse,
  changeBoardUserRoleResponse,
  getLoggedInUserBoardRoleResponse,
  getBoardMemberResponse,
} from "types/service/response";

// MEMBERS - GET
export const getBoardMembers = async ({
  boardId,
  limit,
  page,
  username,
  setLoading,
}: getBoardMembersParams) => {
  return await callAPI<getBoardMembersResponse>({
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

export const getBoardMember = async ({
  boardId,
  userId,
  setLoading,
}: getBoardMemberParams) => {
  return await callAPI<getBoardMemberResponse>({
    method: "GET",
    url: `/board/${boardId}/members/${userId}`,
    token: true,
    setLoading,
  });
};

// MEMBER - DELETE
export const removeUserFromBoard = async ({
  boardId,
  userId,
  setLoading,
}: removeUserFromBoardParams) => {
  return await callAPI<GeneralResponse>({
    method: "DELETE",
    url: `/board/${boardId}/members/${userId}`,
    token: true,
    setLoading,
  });
};

// MEMBER - PATCH
export const addUserToBoard = async ({ boardId, userId, setLoading }: addUserToBoardParams) => {
  return await callAPI<GeneralResponse>({
    method: "PATCH",
    url: `/board/${boardId}/members?userId=${userId}`,
    token: true,
    setLoading,
  });
};

// MEMBER ROLE - PATCH
export const changeBoardUserRole = async ({
  boardId,
  userId,
  newRole,
  setLoading,
}: changeBoardUserRoleParams) => {
  return await callAPI<changeBoardUserRoleResponse>({
    method: "PATCH",
    url: `/board/${boardId}/members/${userId}?newRole=${newRole}`,
    token: true,
    setLoading,
  });
};

// LOGGEDIN USER ROLE - GET
export const getLoggedInUserBoardRole = async ({
  boardId,
  userId,
  setLoading,
}: getLoggedInUserBoardRoleParams) => {
  return await callAPI<getLoggedInUserBoardRoleResponse>({
    method: "GET",
    url: `/board/${boardId}/members/${userId}`,
    token: true,
    setLoading,
  });
};
