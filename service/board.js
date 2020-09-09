const User = require("../models/user");
const Board = require("../models/board");

const boardService = {};

boardService.createNewBoard = async (req, res) => {
	const { id: authorId } = req.user;
	const { name, description, members } = req.body;
	const membersIds = members.map(({ id }) => ({ id }));
	membersIds.push({id: authorId});
	const newBoard = new Board({ name, description, members: membersIds, author: authorId });
	try {
		await newBoard.save();
		return res.json({ message: "created" });
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
};

boardService.getMyBoards = async (req, res) => {
	const { id } = req.user;
	try {
		const foundUserBoards = await Board.find({ members: { $elemMatch: { "id": req.user.id } } });
		return res.json(foundUserBoards);
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
};

boardService.getBoardById = async (req, res) => {
	return res.json({ message: "board id" });
};

boardService.updateBoard = async (req, res) => {
	return res.json({ message: "board id" });
};

module.exports = boardService;
