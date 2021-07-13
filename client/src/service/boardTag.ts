import callAPI, { serviceParams } from "./utils/fetchData";
import { TagI } from "types";

// TAGS - GET
interface getBoardTagsParams extends serviceParams {
  boardId: string;
}
interface getBoardTagsResponse {
  tags: TagI[];
}
export const getBoardTags = async ({ boardId, setLoading }: getBoardTagsParams) => {
  return await callAPI<getBoardTagsResponse>({
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
interface getBoardTagsResponse {
  message: string;
  tag: TagI;
}
export const createBoardTag = async ({ boardId, payload, setLoading }: createBoardTagParams) => {
  return await callAPI<getBoardTagsResponse>({
    method: "POST",
    url: `/board/${boardId}/tag`,
    token: true,
    payload,
    setLoading,
  });
};

// TAG - UPDATE
interface updateBoardTagParams extends serviceParams {
  boardId: string;
  tagId: string;
  payload: {
    name: string;
    color: string;
  };
}
interface updateBoardTagsResponse {
  message: string;
  tag: TagI;
}
export const updateBoardTag = async ({ boardId, tagId, payload, setLoading }: updateBoardTagParams) => {
  return await callAPI<updateBoardTagsResponse>({
    method: "POST",
    url: `/board/${boardId}/tag/${tagId}`,
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
interface deleteBoardTagResponse {
  message: string
}
export const deleteBoardTag = async ({ boardId, tagId, setLoading }: deleteBoardTagParams) => {
  return await callAPI<deleteBoardTagResponse>({
    method: "DELETE",
    url: `/board/${boardId}/tag/${tagId}`,
    token: true,
    setLoading,
  });
};