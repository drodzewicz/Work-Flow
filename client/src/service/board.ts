import fetchData, { serviceParams } from "./utils/fetchData";

// MY BOARDS - GET
interface getMyBoardsParams extends serviceParams {
  page?: number;
  limit?: number;
}
export const getMyBoards = async (
  { page, limit, setLoading }: getMyBoardsParams = { page: 1, limit: 8 }
) => {
  return await fetchData({
    method: "GET",
    url: `/board/user/my_boards?page=${page}&limit=${limit}`,
    token: true,
    setLoading,
  });
};

// BOARD - DELETE
interface deleteBoardParams extends serviceParams {
  boardId: string;
}
export const deleteBoard = async ({ boardId, setLoading }: deleteBoardParams) => {
  return await fetchData({
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
export const createBoard = async ({ setLoading, payload }: createBoardParams) => {
  return await fetchData({
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
  return await fetchData({
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
export const leaveBoard = async ({ boardId, setLoading }: leaveBoardParams) => {
  return await fetchData({
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
export const updateBoard = async ({ boardId, setLoading, payload }: updateBoardParams) => {
  return await fetchData({
    method: "POST",
    url: `/board/${boardId}`,
    token: true,
    setLoading,
    payload,
  });
};

// BOARDS PINNED - GET
export const getPinnedBoards = async ({ setLoading }: serviceParams = {}) => {
  return await fetchData({
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
export const togglePinBoard = async ({ boardId, setLoading }: togglePinBoardParams) => {
  return await fetchData({
    method: "PATCH",
    url: `/board/user/pined_boards?boardId=${boardId}`,
    token: true,
    setLoading,
  });
};
