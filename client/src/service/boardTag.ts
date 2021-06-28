import fetchData, { serviceParams } from "./utils/fetchData";

// TAGS - GET
interface getBoardTagsParams extends serviceParams {
  boardId: string;
}
export const getBoardTags = async ({ boardId, setLoading }: getBoardTagsParams) => {
  return await fetchData({
    method: "GET",
    url: `/board/${boardId}/tag/`,
    token: true,
    setLoading,
  });
};

// TAG - POST
interface createBoardTagParams extends serviceParams {
  boardId: string;
  payload: {
    name: string;
    color: string;
  };
}
export const createBoardTag = async ({ boardId, payload, setLoading }: createBoardTagParams) => {
  return await fetchData({
    method: "POST",
    url: `/board/${boardId}/tag`,
    token: true,
    payload,
    setLoading,
  });
};


// TAG - DELETE
interface deleteBoardTagParams extends serviceParams {
  boardId: string;
  color: string;
}
export const deleteBoardTag = async ({ boardId, color, setLoading }: deleteBoardTagParams) => {
  return await fetchData({
    method: "DELETE",
    url: `/board/${boardId}/tag/${color}`,
    token: true,
    setLoading,
  });
};