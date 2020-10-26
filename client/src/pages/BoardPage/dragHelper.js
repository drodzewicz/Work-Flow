import { emitWS } from "helper/socketData";

const handleMoveColumn = async (boardId, setTasks, sourceIndex, destinationIndex) => {
	if (sourceIndex !== destinationIndex) {
		emitWS({
			roomId: boardId,
			eventName: "moveColumn",
			token: true,
			payload: {
				sourceIndex,
				destinationIndex,
			},
		});
	}
};

const handleMoveTask = async (boardId, setTasks, tasks, source, destination) => {
	const indexOfSourceColumn = tasks.findIndex(({ _id }) => _id === source.droppableId);
	const indexOfDestinationColumn = tasks.findIndex(({ _id }) => _id === destination.droppableId);
	setTasks((taskColumns) => {
		const tempTasks = [...taskColumns];
		const movingTask = tempTasks[indexOfSourceColumn].tasks.splice(source.index, 1)[0];
		tempTasks[indexOfDestinationColumn].tasks.splice(destination.index, 0, movingTask);
		return tempTasks;
	});
	const sourceIndexes = { columnIndex: indexOfSourceColumn, taskIndex: source.index }
	const destinationIndexes = { columnIndex: indexOfDestinationColumn, taskIndex: destination.index }
	if (sourceIndexes.columnIndex !== destinationIndexes.columnIndex || sourceIndexes.taskIndex !== destinationIndexes.taskIndex) {
		emitWS({
			roomId: boardId,
			eventName: "moveTask",
			token: true,
			payload: {
				source: sourceIndexes,
				destination: destinationIndexes,
			}
		
		});
	}

};

export const onDragEnd = (boardId, result, tasks, setTasks) => {
	if (!result.destination) return;
	const { source, destination, type } = result;
	if (type === "droppableTaskToColumn") handleMoveTask(boardId, setTasks, tasks, source, destination);
	else if (type === "droppableColumn") handleMoveColumn(boardId, setTasks, source.index, destination.index);
};
