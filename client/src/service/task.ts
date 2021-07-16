import callAPI from "./utils/fetchData";
import { emitWS } from "./utils/socketData";
import {
  getBoardTaskParams,
  updateBoardTaskParams,
  deleteTaskParams,
  moveTaskParams,
  createTaskParams,
} from "types/service/request";
import { getTaskResponse, GeneralResponse} from "types/service/response";

// TASKS - GET
export const getBoardTask = async ({ boardId, taskId, setLoading }: getBoardTaskParams) => {
  return await callAPI<getTaskResponse>({
    method: "GET",
    url: `/board/${boardId}/task/${taskId}`,
    token: true,
    setLoading,
  });
};

// TASK UPDATE - POST
export const updateBoardTask = async ({
  boardId,
  taskId,
  payload,
  setLoading,
}: updateBoardTaskParams) => {
  return await callAPI<GeneralResponse>({
    method: "POST",
    url: `/board/${boardId}/task/${taskId}`,
    token: true,
    setLoading,
    payload,
  });
};

// TASK - DELETE
export const deleteTask = ({ boardId, payload, res }: deleteTaskParams) => {
  emitWS({
    roomId: boardId,
    eventName: "deleteTask",
    token: true,
    payload,
    res,
  });
};

// TASK - MOVE
export const moveTask = ({ boardId, payload, res }: moveTaskParams) => {
  emitWS({
    roomId: boardId,
    eventName: "moveTask",
    token: true,
    payload,
    res,
  });
};

// TASK - POST
export const createTask = ({ boardId, columnId, payload, res }: createTaskParams) => {
  emitWS({
    roomId: boardId,
    eventName: "createTask",
    token: true,
    payload: {
      ...payload,
      columnId,
    },
    res,
  });
};
