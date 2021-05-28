import { moveColumn, moveTask } from "service";
import { TasksActionType } from "context/TaskContext";

const handleMoveColumn = async (boardId, tasksDispatch, sourceIndex, destinationIndex) => {
  if (sourceIndex !== destinationIndex) {
    tasksDispatch({
      type: TasksActionType.MOVE_COLUMN,
      payload: { sourceIndex, destinationIndex },
    });
    moveColumn({
      boardId,
      payload: {
        sourceIndex,
        destinationIndex,
      },
    });
  }
};

const handleMoveTask = async (boardId, tasksDispatch, tasks, source, destination) => {
  const indexOfSourceColumn = tasks.findIndex(({ _id }) => _id === source.droppableId);
  const indexOfDestinationColumn = tasks.findIndex(({ _id }) => _id === destination.droppableId);
  tasksDispatch({
    type: TasksActionType.MOVE_TASK,
    payload: {
      column: {
        sourceIndex: indexOfSourceColumn,
        destinationIndex: indexOfDestinationColumn,
      },
      task: {
        sourceIndex: source.index,
        destinationIndex: destination.index,
      },
    },
  });
  const sourceIndexes = { columnIndex: indexOfSourceColumn, taskIndex: source.index };
  const destinationIndexes = {
    columnIndex: indexOfDestinationColumn,
    taskIndex: destination.index,
  };
  if (
    sourceIndexes.columnIndex !== destinationIndexes.columnIndex ||
    sourceIndexes.taskIndex !== destinationIndexes.taskIndex
  ) {
    moveTask({
      boardId,
      payload: {
        source: sourceIndexes,
        destination: destinationIndexes,
      },
    });
  }
};

export const onDragEnd = (boardId, result, tasks, tasksDispatch) => {
  if (!result.destination) return;
  const { source, destination, type } = result;
  if (type === "droppableTaskToColumn")
    handleMoveTask(boardId, tasksDispatch, tasks, source, destination);
  else if (type === "droppableColumn")
    handleMoveColumn(boardId, tasksDispatch, source.index, destination.index);
};
