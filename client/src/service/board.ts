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
  { page, limit, setLoading }: getMyBoardsParams = { page: 1, limit: 8 }
) => {
  return await callAPI<getMyBoardsResponse>({
    method: "GET",
    url: `/board/user/my_boards`,
    query: {
      page,
      limit,
    },
    token: true,
    setLoading,
  });
};

// BOARD - DELETE
export const deleteBoard = async ({ boardId, setLoading }: deleteBoardParams) => {
  return await callAPI<GeneralResponse>({
    method: "DELETE",
    url: `/board/${boardId}`,
    token: true,
    setLoading,
  });
};

// BOARD - POST
export const createBoard = async ({ setLoading, payload }: createBoardParams) => {
  return await callAPI<createdBordResponse>({
    method: "POST",
    url: `/board/`,
    token: true,
    setLoading,
    payload,
  });
};

// BOARD - GET
export const getBoard = async ({ short = false, boardId, setLoading }: getBoardParams) => {
  return await callAPI<BoardFullI>({
    method: "GET",
    url: `/board/${boardId}?short=${short}`,
    token: true,
    setLoading,
  });
};

// BOARD LEAVE - DELETE
export const leaveBoard = async ({ boardId, setLoading }: leaveBoardParams) => {
  return await callAPI<GeneralResponse>({
    method: "DELETE",
    url: `/board/${boardId}/leave_board`,
    token: true,
    setLoading,
  });
};

// BOARD UPDATE - POST
export const updateBoard = async ({ boardId, setLoading, payload }: updateBoardParams) => {
  return await callAPI<updateBoardresponse>({
    method: "POST",
    url: `/board/${boardId}`,
    token: true,
    setLoading,
    payload,
  });
};

// BOARDS PINNED - GET
export const getPinnedBoards = async ({ setLoading }: serviceParams = {}) => {
  return await callAPI<getPinnedBoardsResponse>({
    method: "GET",
    url: "/board/user/pined_boards",
    token: true,
    setLoading,
  });
};
// BOARD PINNED - PATCH
export const togglePinBoard = async ({ boardId, setLoading }: togglePinBoardParams) => {
  return await callAPI<togglePinBoardResponse>({
    method: "PATCH",
    url: `/board/user/pined_boards`,
    query: {
      boardId,
    },
    token: true,
    setLoading,
  });
};
