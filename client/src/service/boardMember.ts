import fetchData, { serviceParams } from "./utils/fetchData";

// MEMBERS - GET
interface getBoardMembersParams extends serviceParams {
  boardId: string;
  limit?: number;
  page?: number;
}
export const getBoardMembers = async ({
  boardId,
  limit = 8,
  page = 1,
  setLoading,
}: getBoardMembersParams) => {
  return await fetchData({
    method: "GET",
    url: `/board/${boardId}/members?limit=${limit}&page=${page}`,
    token: true,
    setLoading,
  });
};

// MEMBER - DELETE
interface removeUserFromBoardParams extends serviceParams {
  boardId: string;
  userId: string;
}
export const removeUserFromBoard = async ({
  boardId,
  userId,
  setLoading,
}: removeUserFromBoardParams) => {
  return await fetchData({
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
export const addUserToBoard = async ({ boardId, userId, setLoading }: addUserToBoardParams) => {
  return await fetchData({
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
export const changeBoardUserRole = async ({
  boardId,
  userId,
  newRole,
  setLoading,
}: changeBoardUserRoleParams) => {
  return await fetchData({
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
export const getLoggedInUserBoardRole = async ({
  boardId,
  userId,
  setLoading,
}: getLoggedInUserBoardRoleParams) => {
  return await fetchData({
    method: "GET",
    url: `/board/${boardId}/members/${userId}`,
    token: true,
    setLoading,
  });
};

// MEMBER SEARCH - GET
interface searchUserInBoardParams extends serviceParams {
  boardId: string;
  username: string;
}
export const searchUserInBoard = async ({
  boardId,
  username,
  setLoading,
}: searchUserInBoardParams) => {
  return await fetchData({
    method: "GET",
    url: `/board/${boardId}/members?username=${username}`,
    token: true,
    setLoading,
  });
};

