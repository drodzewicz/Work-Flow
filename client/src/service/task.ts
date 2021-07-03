import fetchData, { serviceParams } from "./utils/fetchData";
import { emitWS, socketServiceParams } from "./utils/socketData";


// TASKS - GET
interface getBoardTaskParams extends serviceParams {
  boardId: string;
  taskId: string;
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
  boardId: string;
  taskId: string;
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
  boardId: string;
  payload: {
    taskId: number;
  };
}
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
interface moveTaskParams extends socketServiceParams {
  boardId: string;
  payload: {
    source: {
      columnIndex: number;
      taskIndex: number;
    };
    destination: {
      columnIndex: number;
      taskIndex: number;
    };
  };
}
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
interface createTaskParams extends socketServiceParams {
  boardId: string;
  columnId: string;
  payload: any;
}
export const createTask = ({ boardId, columnId, payload, res }: createTaskParams) => {
  emitWS({
    roomId: boardId,
    eventName: "createTask",
    token: true,
    payload: {
      ...payload,
      columnId
    },
    res,
  });
};