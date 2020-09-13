const Board = require("../models/board");
const User = require("../models/user");
const paginateConetnt = require("../helper/pagination");

const boardService = {};

boardService.createNewBoard = async (req, res) => {
	const { id: authorId } = req.user;
	const { name, description, members } = req.body;
	members.push(authorId);
	const newBoard = new Board({ name, description, members, author: authorId });
	try {
		await newBoard.save();
		return res.json({ message: "created", board: newBoard });
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
};

boardService.updateBoard = async (req, res) => {
	const { name, description, members } = req.body;
	const { id } = req.params;
	try {
		const foundBoard = await Board.findById(id);
		foundBoard.name = name;
		foundBoard.description = description;
		foundBoard.members = members;
		await foundBoard.save();
		return res.json({ message: "updated", board: foundBoard });
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
};

boardService.getMyBoards = async (req, res) => {
	const { id } = req.user;
	const { page, limit } = req.query;
	try {
		const foundMyBoards = await Board.find({ members: id }).populate("members");
		let paginatedMyBoards = paginateConetnt(foundMyBoards, page, limit);
		const { pinnedBoards } = await User.findById(id);
		paginatedMyBoards.items = paginatedMyBoards.items.map((board) => {
			if (
				pinnedBoards.findIndex(
					(boardId) => boardId.toLocaleString() === board._id.toLocaleString()
				) >= 0
			) {
				return { ...board.toObject(), pinned: true };
			} else {
				return { ...board.toObject(), pinned: false };
			}
		});

		return res.json(paginatedMyBoards);
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
};

boardService.getMyPinnedBoards = async (req, res) => {
	const { id } = req.user;
	try {
		const { pinnedBoards } = await User.findById(id).populate({
			path: "pinnedBoards",
			populate: { path: "members" },
		});
		return res.status(200).json(pinnedBoards.map((board) => ({ ...board.toObject(), pinned: true })));
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
};

boardService.getBoardById = async (req, res) => {
	const { id } = req.params;
	try {
		const foundBoard = await Board.findById(id);
		return res.status(200).json(foundBoard);
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
	return res.json({ message: "board id" });
};

boardService.togglePinBoard = async (req, res) => {
	const { boardId } = req.query;
	const { id } = req.user;

	try {
		const foundUser = await User.findById(id);
		const indexOfPinnedBoard =
			foundUser.pinnedBoards &&
			foundUser.pinnedBoards.findIndex((pinedBoardId) => pinedBoardId.toLocaleString() === boardId);
		if (indexOfPinnedBoard > -1) {
			foundUser.pinnedBoards.splice(indexOfPinnedBoard, 1);
			foundUser.save();
			return res.status(200).json({ message: `unpinned board with id: ${boardId}` });
		} else {
			foundUser.pinnedBoards.push(boardId);
			foundUser.save();
			return res.status(200).json({ message: `pinned board with id: ${boardId}` });
		}
	} catch (error) {
		return res.status(400).json({
			message: User.processErrors(error),
		});
	}
};

boardService.deleteBoard = async (req, res) => {
	const { id } = req.user;
	const { id: boardId } = req.params;

	try {
		const { author } = await Board.findById(boardId);
		if (author.toLocaleString() !== id.toLocaleString()) {
			return res.status(401).json({ message: "you are not the author of this Board" });
		}
		// delete board
		await Board.findByIdAndDelete(boardId);

		// find deleted board in user profiles in 'pinned boards'
		let foundUserPinnedBoards = await User.find({ pinnedBoards: boardId });
		// and then remove them
		foundUserPinnedBoards = foundUserPinnedBoards.map((user) => {
			const tempPinnedBoards = user.pinnedBoards;
			tempPinnedBoards.splice(tempPinnedBoards.indexOf(boardId), 1);
			const tempUser = {
				...user.toObject(),
				pinnedBoards: tempPinnedBoards,
			};
			return tempUser;
		});
		return res.status(200).json({ message: `successfully deleted board with id: ${boardId}` });
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
};

boardService.leaveBoard = async (req, res) => {
	const { id } = req.user;
	const { id: boardId } = req.params;

	try {
		const foundBoard = await Board.findById(boardId);

		foundBoard.members = foundBoard.members.filter((userId) => userId.toLocaleString() !== id.toLocaleString());
		foundBoard.save();

		const foundUser = await User.findById(id);
		foundUser.pinnedBoards = foundUser.pinnedBoards.filter( pinnedBoardId => pinnedBoardId.toLocaleString() !== boardId.toLocaleString())
		foundUser.save();
		return res.status(200).json({ message: `successfully left board of id: ${boardId}` });
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
};

module.exports = boardService;
