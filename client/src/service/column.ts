import fetchData, { serviceParams } from "./utils/fetchData";
import { emitWS, socketServiceParams } from "./utils/socketData";

// COLUMN - CREATE
interface createColumnParams extends socketServiceParams {
  boardId: string;
  payload: {
    name: string;
  };
}
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
interface deleteColumnParams extends socketServiceParams {
  boardId: string;
  payload: {
    columnId: string;
    columnIndex: number;
  };
}
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
interface updateBoardColumnParams extends serviceParams {
  boardId: string;
  columnId: string;
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
  boardId: string;
  payload: {
    sourceIndex: number;
    destinationIndex: number;
  };
}
export const moveColumn = ({ boardId, payload, res }: moveColumnParams) => {
  emitWS({
    roomId: boardId,
    eventName: "moveColumn",
    token: true,
    payload,
    res,
  });
};