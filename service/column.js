const Board = require("../models/board");
const Tag = require("../models/tag");
const Task = require("../models/task");

const columnService = {};

columnService.createColumn = async (req, res) => {
	const { boardId } = req.params;
	const { name } = req.body;
	try {
		const foundBoard = await Board.findOne({ _id: boardId }, "columns");
		const column = { name, columnIndex: foundBoard.columns.length };
		foundBoard.columns.push(column);
		const savedBoard = await foundBoard.save();
		const newColumn = savedBoard.columns.pop();
		return res.status(200).json({ message: "created column", newColumn });
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
};

columnService.getBoardColumns = async (req, res) => {
	const { boardId } = req.params;
	try {
		const { columns } = await Board.findOne({ _id: boardId }, "columns");
		return res.status(200).json({ columns });
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
};

columnService.editColumnName = async (req, res) => {
	const { boardId, columnId } = req.params;
	const { name } = req.body;
	try {
		await Board.findOneAndUpdate(
			{ _id: boardId, "columns._id": columnId },
			{ $set: { "columns.$.name": name } }
		);
		return res.status(200).json({ message: "updated column name" });
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
};

columnService.deleteColumn = async (req, res) => {
	const { boardId, columnId } = req.params;
	try {
		await Board.findOneAndUpdate({ _id: boardId }, { $pull: { columns: { _id: columnId } } });
		return res.status(200).json({ message: "deleted column" });
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
};

columnService.moveColumn = async (req, res) => {
	const { boardId } = req.params;
	const { sourceIndex, destinationIndex } = req.body;
	try {
		const foundBoard = await Board.findOne({ _id: boardId }, "columns");
		const movedColumn = foundBoard.columns.splice(sourceIndex, 1)[0];
		foundBoard.columns.splice(destinationIndex, 0, movedColumn);
		await foundBoard.save();
		return res.status(200).json({ message: "moved column" });
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
};

module.exports = columnService;
