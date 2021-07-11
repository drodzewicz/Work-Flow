import fetchData, { serviceParams, callAPI2 } from "./utils/fetchData";
import { BoardI, BoardFullI } from "types";

// MY BOARDS - GET
interface getMyBoardsParams extends serviceParams {
  page?: number;
  limit?: number;
}
interface getMyBoardsResponse {
  boards: BoardI[];
  prev?: number;
  next?: number;
  totalPageCount?: number;
}
export const getMyBoards = async (
  { page, limit, setLoading }: getMyBoardsParams = { page: 1, limit: 8 }
) => {
  return await callAPI2<getMyBoardsResponse>({
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
interface deleteBoardParams extends serviceParams {
  boardId: string;
}
interface deleteBoardResponse {
  message: string;
}
export const deleteBoard = async ({ boardId, setLoading }: deleteBoardParams) => {
  return await callAPI2<deleteBoardResponse>({
    method: "DELETE",
    url: `/board/${boardId}`,
    token: true,
    setLoading,
  });
};

// BOARD - POST
interface createBoardParams extends serviceParams {
  payload: {
    name: string;
    description: string;
  };
}
interface createdBordResponse {
  board: BoardFullI,
  message: string
}
export const createBoard = async ({ setLoading, payload }: createBoardParams) => {
  return await callAPI2<createdBordResponse>({
    method: "POST",
    url: `/board/`,
    token: true,
    setLoading,
    payload,
  });
};

// BOARD - GET
interface getBoardParams extends serviceParams {
  boardId: string;
  short?: boolean;
}
export const getBoard = async ({ short = false, boardId, setLoading }: getBoardParams) => {
  return await callAPI2<BoardFullI>({
    method: "GET",
    url: `/board/${boardId}?short=${short}`,
    token: true,
    setLoading,
  });
};

// BOARD LEAVE - DELETE
interface leaveBoardParams extends serviceParams {
  boardId: string;
}
interface leaveBoardResponse {
  message: string;
}
export const leaveBoard = async ({ boardId, setLoading }: leaveBoardParams) => {
  return await callAPI2<leaveBoardResponse>({
    method: "DELETE",
    url: `/board/${boardId}/leave_board`,
    token: true,
    setLoading,
  });
};

// BOARD UPDATE - POST
interface updateBoardParams extends serviceParams {
  boardId: string;
  payload: {
    name?: string;
    description?: string;
  };
}
interface updateBoardresponse {
  message: string;
  boardId: string;
}
export const updateBoard = async ({ boardId, setLoading, payload }: updateBoardParams) => {
  return await callAPI2<updateBoardresponse>({
    method: "POST",
    url: `/board/${boardId}`,
    token: true,
    setLoading,
    payload,
  });
};

// BOARDS PINNED - GET
interface getPinnedBoardsResponse {
  boards: BoardI[];
}
export const getPinnedBoards = async ({ setLoading }: serviceParams = {}) => {
  return await callAPI2<getPinnedBoardsResponse>({
    method: "GET",
    url: "/board/user/pined_boards",
    token: true,
    setLoading,
  });
};
// BOARD PINNED - PATCH
interface togglePinBoardParams extends serviceParams {
  boardId: string;
}
interface togglePinBoardResponse {
  boardId: string;
  message: string;
  pinned: boolean;
}
export const togglePinBoard = async ({ boardId, setLoading }: togglePinBoardParams) => {
  return await callAPI2<togglePinBoardResponse>({
    method: "PATCH",
    url: `/board/user/pined_boards`,
    query: {
      boardId,
    },
    token: true,
    setLoading,
  });
};
