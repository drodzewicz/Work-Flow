import callAPI from "./utils/fetchData";
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

export const getBoardTags = async ({ boardId,  ...serviceProps }: getBoardTagsParams) => {
  return await callAPI<getBoardTagsResponse>({
    method: "GET",
    url: `/board/${boardId}/tag/`,
    token: true,
    ...serviceProps
  });
};

// TAG - POST
export const createBoardTag = async ({ boardId, payload,  ...serviceProps }: createBoardTagParams) => {
  return await callAPI<createBoardTagResponse>({
    method: "POST",
    url: `/board/${boardId}/tag`,
    token: true,
    payload,
    ...serviceProps
  });
};

// TAG - UPDATE
export const updateBoardTag = async ({
  boardId,
  tagId,
  payload,
  ...serviceProps
}: updateBoardTagParams) => {
  return await callAPI<updateBoardTagsResponse>({
    method: "POST",
    url: `/board/${boardId}/tag/${tagId}`,
    token: true,
    payload,
    ...serviceProps
  });
};

// TAG - DELETE
export const deleteBoardTag = async ({ boardId, tagId,  ...serviceProps }: deleteBoardTagParams) => {
  return await callAPI<GeneralResponse>({
    method: "DELETE",
    url: `/board/${boardId}/tag/${tagId}`,
    token: true,
    ...serviceProps
  });
};
