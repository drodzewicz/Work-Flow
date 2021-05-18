import fetchData, { serviceParams } from "./utils/fetchData";
import { emitWS, socketServiceParams } from "./utils/socketData";

// COLUMN - CREATE
interface createColumnParams extends socketServiceParams {
  boardId: number | string;
  payload: {
    name: string;
  };
}
export const createColumn = ({ boardId, payload, res }: createColumnParams) => {
  emitWS({
    roomId: boardId as string,
    eventName: "createNewColumn",
    token: true,
    payload,
    res,
  });
};

// COLUMN - DELETE
interface deleteColumnParams extends socketServiceParams {
  boardId: number | string;
  payload: {
    columnId: number,
    columnIndex: number
  };
}
export const deleteColumn = ({ boardId, payload, res }: deleteColumnParams) => {
  emitWS({
    roomId: boardId as string,
    eventName: "deleteColumn",
    token: true,
    payload,
    res,
  });
};

// COLUMN - PATCH
interface updateBoardColumnParams extends serviceParams {
  boardId: number;
  columnId: number;
  payload?: {
    name?: string;
  };
}
export const updateBoardColumn = async ({
  boardId,
  columnId,
  setLoading,
  payload,
}: updateBoardColumnParams) => {
  return await fetchData({
    method: "PATCH",
    url: `/board/${boardId}/column/${columnId}`,
    token: true,
    payload,
    setLoading,
  });
};

// COLUMN - MOVE
interface moveColumnParams extends socketServiceParams {
  boardId: number | string;
  payload: {
    sourceIndex: number,
    destinationIndex: number
  };
}
export const moveColumn = ({ boardId, payload, res }: moveColumnParams) => {
  emitWS({
    roomId: boardId as string,
    eventName: "moveColumn",
    token: true,
    payload,
    res,
  });
};