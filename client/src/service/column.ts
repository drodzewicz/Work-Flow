import callAPI from "./utils/fetchData";
import { emitWS } from "./utils/socketData";

import {
  createColumnParams,
  deleteColumnParams,
  updateBoardColumnParams,
  moveColumnParams,
} from "types/service/request";
import { GeneralResponse } from "types/service/response";

// COLUMN - CREATE
export const createColumn = ({ boardId, payload, res }: createColumnParams) => {
  emitWS({
    roomId: boardId,
    eventName: "createNewColumn",
    token: true,
    payload,
    res,
  });
};

// COLUMN - DELETE
export const deleteColumn = ({ boardId, payload, res }: deleteColumnParams) => {
  emitWS({
    roomId: boardId,
    eventName: "deleteColumn",
    token: true,
    payload,
    res,
  });
};

// COLUMN - PATCH
export const updateBoardColumn = async ({
  boardId,
  columnId,
  payload,
  ...serviceProps
}: updateBoardColumnParams) => {
  return await callAPI<GeneralResponse>({
    method: "PATCH",
    url: `/board/${boardId}/column/${columnId}`,
    token: true,
    payload,
    ...serviceProps
  });
};

// COLUMN - MOVE
export const moveColumn = ({ boardId, payload, res }: moveColumnParams) => {
  emitWS({
    roomId: boardId,
    eventName: "moveColumn",
    token: true,
    payload,
    res,
  });
};
