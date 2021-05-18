import fetchData, { serviceParams } from "./utils/fetchData";
import { emitWS, socketServiceParams } from "./utils/socketData";


// TASKS - GET
interface getBoardTaskParams extends serviceParams {
  boardId: number;
  taskId: number;
}
export const getBoardTask = async ({ boardId, taskId, setLoading }: getBoardTaskParams) => {
  return await fetchData({
    method: "GET",
    url: `/board/${boardId}/task/${taskId}`,
    token: true,
    setLoading,
  });
};

// TASK UPDATE - POST
interface updateBoardTaskParams extends serviceParams {
  boardId: number;
  taskId: number;
  payload: any;
}
export const updateBoardTask = async ({
  boardId,
  taskId,
  payload,
  setLoading,
}: updateBoardTaskParams) => {
  return await fetchData({
    method: "POST",
    url: `/board/${boardId}/task/${taskId}`,
    token: true,
    setLoading,
    payload,
  });
};

// TASK - DELETE
interface deleteTaskParams extends socketServiceParams {
  boardId: number | string;
  payload: {
    taskId: number;
  };
}
export const deleteTask = ({ boardId, payload, res }: deleteTaskParams) => {
  emitWS({
    roomId: boardId as string,
    eventName: "deleteTask",
    token: true,
    payload,
    res,
  });
};

// TASK - MOVE
interface moveTaskParams extends socketServiceParams {
  boardId: number | string;
  payload: {
    sourceIndex: number;
    destinationIndex: number;
  };
}
export const moveTask = ({ boardId, payload, res }: moveTaskParams) => {
  emitWS({
    roomId: boardId as string,
    eventName: "moveTask",
    token: true,
    payload,
    res,
  });
};

// TASK - POST
interface createTaskParams extends socketServiceParams {
  boardId: number | string;
  payload: any;
}
export const createTask = ({ boardId, payload, res }: createTaskParams) => {
  emitWS({
    roomId: boardId as string,
    eventName: "createTask",
    token: true,
    payload,
    res,
  });
};