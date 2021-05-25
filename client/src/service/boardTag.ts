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
    colorCode: string;
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

// TAG UPDATE - POST
interface updateBoardTagParams extends serviceParams {
  boardId: string;
  tagId: string;
  payload: {
    name: string;
    colorCode: string;
  };
}
export const updateBoardTag = async ({ boardId, payload, setLoading }: updateBoardTagParams) => {
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
  tagId: string;
}
export const deleteBoardTag = async ({ boardId, tagId, setLoading }: deleteBoardTagParams) => {
  return await fetchData({
    method: "DELETE",
    url: `/board/${boardId}/tag/${tagId}`,
    token: true,
    setLoading,
  });
};