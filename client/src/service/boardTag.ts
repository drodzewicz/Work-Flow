import callAPI, { serviceParams } from "./utils/fetchData";
import { TagI } from "types/general";
import {
  getBoardTagsParams,
  createBoardTagParams,
  updateBoardTagParams,
  deleteBoardTagParams,
} from "types/service/request";
import {
  getBoardTagsResponse,
  updateBoardTagsResponse,
  createBoardTagResponse,
  GeneralResponse
} from "types/service/response";

// TAGS - GET

export const getBoardTags = async ({ boardId, setLoading }: getBoardTagsParams) => {
  return await callAPI<getBoardTagsResponse>({
    method: "GET",
    url: `/board/${boardId}/tag/`,
    token: true,
    setLoading,
  });
};

// TAG - POST
export const createBoardTag = async ({ boardId, payload, setLoading }: createBoardTagParams) => {
  return await callAPI<createBoardTagResponse>({
    method: "POST",
    url: `/board/${boardId}/tag`,
    token: true,
    payload,
    setLoading,
  });
};

// TAG - UPDATE
export const updateBoardTag = async ({
  boardId,
  tagId,
  payload,
  setLoading,
}: updateBoardTagParams) => {
  return await callAPI<updateBoardTagsResponse>({
    method: "POST",
    url: `/board/${boardId}/tag/${tagId}`,
    token: true,
    payload,
    setLoading,
  });
};

// TAG - DELETE
export const deleteBoardTag = async ({ boardId, tagId, setLoading }: deleteBoardTagParams) => {
  return await callAPI<GeneralResponse>({
    method: "DELETE",
    url: `/board/${boardId}/tag/${tagId}`,
    token: true,
    setLoading,
  });
};
