const Board = require("../../models/board");
const User = require("../../models/user");

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
			message: Board.processErrors(error),
		};
	}
};

module.exports = columnSocketService;
