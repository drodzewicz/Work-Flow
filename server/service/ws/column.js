const Board = require("../../models/board");
const Task = require("../../models/task");
const processErrors = require("../../helper/errorHandler");

const columnSocketService = {};

columnSocketService.createColumn = async (data) => {
	const { name, boardId } = data;
	try {
		const foundBoard = await Board.findOne({ _id: boardId }, "columns");
		const column = { name, columnIndex: foundBoard.columns.length };
		foundBoard.columns.push(column);
		const savedBoard = await foundBoard.save();
		const newColumn = savedBoard.columns.pop();
		return { message: "created column", newColumn };
	} catch (error) {
		return {
			error: true,
			message: processErrors(error),
		};
	}
};

columnSocketService.deleteColumn = async (data) => {
	const { boardId, columnId, columnIndex } = data;
	try {
		const { columns } = await Board.findOne({ _id: boardId }, "columns");
		await Board.findOneAndUpdate({ _id: boardId }, { $pull: { columns: { _id: columnId } } });
		await Task.deleteMany({ "_id": { "$in": columns[columnIndex].tasks } })

		return { message: "deleted column", index: columnIndex };

	} catch (error) {
		return {
			error: true,
			message: processErrors(error),
		};
	}
};
columnSocketService.moveColumn = async (data) => {
	const { boardId, sourceIndex, destinationIndex } = data;
	try {
		const foundBoard = await Board.findOne({ _id: boardId }, "columns");
		const movedColumn = foundBoard.columns.splice(sourceIndex, 1)[0];
		foundBoard.columns.splice(destinationIndex, 0, movedColumn);
		await foundBoard.save();
		return { message: "moved column", source: sourceIndex, destination: destinationIndex };
	} catch (error) {
		return {
			error: true,
			message: processErrors(error),
		};
	}
};


module.exports = columnSocketService;
