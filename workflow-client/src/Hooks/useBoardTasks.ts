import { useCallback, useContext } from "react";

import { TaskContext } from "@/context/TaskContext";
import { TasksAction } from "@/context/TaskContext/actions";

import useAuthClient from "./useClient";

const useBoardTask = () => {
  const [data, dispatch] = useContext(TaskContext);
  const client = useAuthClient();

  const getColumn = useCallback(
    (columnId: string) => {
      return data.columns.find(({ _id }) => _id === columnId);
    },
    [data]
  );

  const setBoard = (data: string) => {
    dispatch({ type: TasksAction.SET_BOARD, payload: data });
  };

  const setData = (data: ColumnWithTasks[]) => {
    dispatch({ type: TasksAction.SET_TASKS, payload: data });
  };

  const moveColumn = async (columnId: string, source: number, destination: number) => {
    // ignore move column action if the source is the same as destination
    if (source === destination) {
      return;
    }
    dispatch({
      type: TasksAction.MOVE_COLUMN,
      payload: { source, destination },
    });
    try {
      await client.patch(`/boards/${data.boardId}/columns/${columnId}`, { index: destination });
    } catch (error) {
      // rollback action on error
      dispatch({
        type: TasksAction.MOVE_COLUMN,
        payload: { source: destination, destination: source },
      });
    }
  };

  const moveTask = async (
    taskId: string,
    source: { columnId: string },
    destination: { columnId: string; rowIndex: number }
  ) => {
    const sourceColumnIndex = data.columns.findIndex(({ _id }) => _id === source.columnId);
    const sourceTaskIndex = data.columns[sourceColumnIndex].tasks.findIndex(
      ({ _id }) => _id === taskId
    );
    const destinationColumnIndex = data.columns.findIndex(
      ({ _id }) => _id === destination.columnId
    );

    // ignore move task action if the source is the same as destination
    if (sourceColumnIndex === destinationColumnIndex && sourceTaskIndex === destination.rowIndex) {
      return;
    }
    dispatch({
      type: TasksAction.MOVE_TASK,
      payload: {
        source: [sourceColumnIndex, sourceTaskIndex],
        destination: [destinationColumnIndex, destination.rowIndex],
      },
    });

    try {
      await client.patch(`/tasks/${taskId}/move`, {
        boardId: data.boardId,
        columnId: destination.columnId,
        rowIndex: destination.rowIndex,
      });
    } catch (error) {
      // rollback action on error
      dispatch({
        type: TasksAction.MOVE_TASK,
        payload: {
          source: [destinationColumnIndex, destination.rowIndex],
          destination: [sourceColumnIndex, sourceTaskIndex],
        },
      });
    }
  };

  return { data, getColumn, setData, setBoard, moveColumn, moveTask };
};

export default useBoardTask;
