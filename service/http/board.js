const Board = require("../../models/board");
const User = require("../../models/user");
const Task = require("../../models/task");
const Tag = require("../../models/tag");
const paginateConetnt = require("../../helper/pagination");
const processErrors = require("../../helper/errorHandler");

const boardService = {};

boardService.createNewBoard = async (req, res) => {
	const { id: authorId } = req.user;
	const { name, description } = req.body;
	const members = [{ user: authorId, role: "owner" }];
	const newBoard = new Board({ name, description, members, author: authorId });
	try {
		await newBoard.save();
		return res.json({
			success: true,
			message: "new board successfuly created",
			board: newBoard
		});
	} catch (error) {
		return res.status(400).json({
			error: true,
			message: processErrors(error),
		});
	}
};
boardService.updateBoard = async (req, res) => {
	const { name, description } = req.body;
	const { boardId } = req.params;
	try {
		await Board.findOneAndUpdate({ _id: boardId }, { name, description })
		return res.json({
			board: { _id: boardId },
			message: "board successfuly updated",
			success: true
		});
	} catch (error) {
		return res.status(400).json({
			error: true,
			message: processErrors(error),
		});
	}
};
boardService.getMyBoards = async (req, res) => {
	const { id } = req.user;
	const { page, limit } = req.query;
	try {
		const foundMyBoards = await Board.find(
			{ "members.user": id },
			"description members name _id author"
		).sort({ timeCreated: -1 }).populate({
			path: "members",
			populate: { path: "user", select: "username avatarImageURL _id" },
		});
		let paginatedMyBoards = paginateConetnt(foundMyBoards, page, limit);
		const { pinnedBoards } = await User.findById(id);
		paginatedMyBoards.items = paginatedMyBoards.items.map((board) => {
			let isAuthor = false;
			if (board.author.toLocaleString() === id.toLocaleString()) isAuthor = true;
			if (
				pinnedBoards.findIndex(
					(boardId) => boardId.toLocaleString() === board._id.toLocaleString()
				) >= 0
			) {
				return { ...board.toObject(), pinned: true, isAuthor };
			} else {
				return { ...board.toObject(), pinned: false, isAuthor };
			}
		});

		return res.json(paginatedMyBoards);
	} catch (error) {
		return res.status(400).json({
			error: true,
			message: processErrors(error),
		});
	}
};
boardService.getMyPinnedBoards = async (req, res) => {
	const { id } = req.user;
	try {
		let { pinnedBoards } = await User.findById(id).populate({
			path: "pinnedBoards",
			select: "description members name _id author",
			populate: { path: "members", populate: { path: "user", select: "username avatarImageURL _id" } },
		});
		pinnedBoards = pinnedBoards.map((board) => {
			let isAuthor = false;
			if (board.author.toLocaleString() === id.toLocaleString()) isAuthor = true;
			return { ...board.toObject(), pinned: true, isAuthor };
		});
		return res.status(200).json(pinnedBoards);
	} catch (error) {
		return res.status(400).json({
			errror: true,
			message: processErrors(error),
		});
	}
};
boardService.getBoardById = async (req, res) => {
	const { boardId } = req.params;
	const { short } = req.query;
	try {
		let foundBoard;
		if (short === "true") {
			foundBoard = await Board.findOne({ _id: boardId }, "_id name description author");
		} else {
			foundBoard = await Board.findOne({ _id: boardId }, "_id name description author columns").populate({
				path: "columns",
				populate: {
					path: "tasks",
					populate: {
						path: "people tags",
						select: "_id username avatarImageURL colorCode name",
					},
				},
			});
		}
		return res.status(200).json(foundBoard);
	} catch (error) {
		return res.status(404).json({
			error: true,
			message: processErrors(error),
		});
	}
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
	const { boardId } = req.params;

	try {
		const { author, tags } = await Board.findById(boardId);
		if (author.toLocaleString() !== id.toLocaleString()) {
			return res.status(401).json({ message: "you are not the author of this Board" });
		}
		// delete tasks
		await Task.deleteMany({ "board": boardId });
		// delete tags
		await Tag.deleteMany({ "_id": { "$in": tags } });
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
			message: processErrors(error),
		});
	}
};
boardService.leaveBoard = async (req, res) => {
	const { id } = req.user;
	const { boardId } = req.params;

	try {
		const foundBoard = await Board.findById(boardId);

		foundBoard.members = foundBoard.members.filter(
			({ user }) => user.toLocaleString() !== id.toLocaleString()
		);
		foundBoard.save();

		const foundUser = await User.findById(id);
		foundUser.pinnedBoards = foundUser.pinnedBoards.filter(
			(pinnedBoardId) => pinnedBoardId.toLocaleString() !== boardId.toLocaleString()
		);
		foundUser.save();
		return res.status(200).json({ message: `successfully left board of id: ${boardId}` });
	} catch (error) {
		return res.status(400).json({
			message: processErrors(error),
		});
	}
};

module.exports = boardService;
