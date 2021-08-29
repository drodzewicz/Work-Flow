import callAPI from "./utils/fetchData";
import { serviceParams } from "types/service/request";

import { BoardFullI } from "types/general";
import {
  getMyBoardsParams,
  deleteBoardParams,
  createBoardParams,
  getBoardParams,
  leaveBoardParams,
  updateBoardParams,
  getPinnedBoardsResponse,
  togglePinBoardParams,
} from "types/service/request";
import {
  getMyBoardsResponse,
  updateBoardresponse,
  GeneralResponse,
  createdBordResponse,
  togglePinBoardResponse,
} from "types/service/response";

// MY BOARDS - GET
export const getMyBoards = async (
  { page, limit,  ...serviceProps }: getMyBoardsParams = { page: 1, limit: 8 }
) => {
  return await callAPI<getMyBoardsResponse>({
    method: "GET",
    url: `/board/user/my_boards`,
    query: {
      page,
      limit,
    },
    token: true,
    ...serviceProps
  });
};

// BOARD - DELETE
export const deleteBoard = async ({ boardId,  ...serviceProps }: deleteBoardParams) => {
  return await callAPI<GeneralResponse>({
    method: "DELETE",
    url: `/board/${boardId}`,
    token: true,
    ...serviceProps
  });
};

// BOARD - POST
export const createBoard = async ({ payload,  ...serviceProps }: createBoardParams) => {
  return await callAPI<createdBordResponse>({
    method: "POST",
    url: `/board/`,
    token: true,
    payload,
    ...serviceProps
  });
};

// BOARD - GET
export const getBoard = async ({ short = false, boardId,  ...serviceProps }: getBoardParams) => {
  return await callAPI<BoardFullI>({
    method: "GET",
    url: `/board/${boardId}?short=${short}`,
    token: true,
    ...serviceProps
  });
};

// BOARD LEAVE - DELETE
export const leaveBoard = async ({ boardId,  ...serviceProps }: leaveBoardParams) => {
  return await callAPI<GeneralResponse>({
    method: "DELETE",
    url: `/board/${boardId}/leave_board`,
    token: true,
    ...serviceProps
  });
};

// BOARD UPDATE - POST
export const updateBoard = async ({ boardId, setLoading,  ...serviceProps }: updateBoardParams) => {
  return await callAPI<updateBoardresponse>({
    method: "POST",
    url: `/board/${boardId}`,
    token: true,
    setLoading,
    ...serviceProps
  });
};

// BOARDS PINNED - GET
export const getPinnedBoards = async ({  ...serviceProps }: serviceParams = {}) => {
  return await callAPI<getPinnedBoardsResponse>({
    method: "GET",
    url: "/board/user/pined_boards",
    token: true,
    ...serviceProps
  });
};
// BOARD PINNED - PATCH
export const togglePinBoard = async ({ boardId,  ...serviceProps }: togglePinBoardParams) => {
  return await callAPI<togglePinBoardResponse>({
    method: "PATCH",
    url: `/board/user/pined_boards`,
    query: {
      boardId,
    },
    token: true,
    ...serviceProps
  });
};
