const Board = require("../../models/board");
const Tag = require("../../models/tag");
const Task = require("../../models/task");

const columnService = {};


columnService.getBoardColumns = async (req, res) => {
	const { boardId } = req.params;
	try {
		const { columns } = await Board.findOne({ _id: boardId }, "columns").populate({
			path: "columns",
			populate: {
				path: "tasks",
				populate: {
					path: "people tags",
					select: "_id username avatarImageURL colorCode name",
				},
			},
		});
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


module.exports = columnService;
