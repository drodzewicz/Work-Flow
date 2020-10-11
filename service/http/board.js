const Board = require("../../models/board");
const User = require("../../models/user");
const paginateConetnt = require("../../helper/pagination");

const boardService = {};

boardService.createNewBoard = async (req, res) => {
	const { id: authorId } = req.user;
	const { name, description } = req.body;
	const members = [{ user: authorId, role: "owner" }];
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

		const updatedMemberList = [];
		members.forEach(({ user: newUser }) => {
			const indexOfExistingUser = foundBoard.members.findIndex(
				({ user }) => user.toLocaleString() === newUser.toLocaleString()
			);
			if (indexOfExistingUser >= 0) {
				updatedMemberList.push(foundBoard.members[indexOfExistingUser]);
			} else {
				updatedMemberList.push({ user: newUser, role: "regular" });
			}
		});
		foundBoard.members = updatedMemberList;

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
		const foundMyBoards = await Board.find(
			{ "members.user": id },
			"description members name _id author"
		).populate({
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
			message: Board.processErrors(error),
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
			message: Board.processErrors(error),
		});
	}
};

boardService.getBoardById = async (req, res) => {
	const { id } = req.params;
	try {
		const foundBoard = await Board.findOne({ _id: id }, "_id name description author columns").populate({
			path: "columns",
			populate: {
				path: "tasks",
				populate: {
					path: "people tags",
					select: "_id username avatarImageURL colorCode name",
				},
			},
		});
		return res.status(200).json(foundBoard);
	} catch (error) {
		return res.status(404).json({
			message: Board.processErrors(error),
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
			message: Board.processErrors(error),
		});
	}
};

boardService.getBoardMembers = async (req, res) => {
	const { id } = req.params;
	const { page, limit } = req.query;
	const { username } = req.query;

	try {
		const { members } = await Board.findOne({ _id: id }, "members").populate({
			path: "members",
			populate: {
				path: "user",
				select: "_id username avatarImageURL",
			},
		});
		if (!page || !limit) {
			return res.status(200).json(members);
		}
		if (!!username) {
			const matchedMembers = members.find((value) => username.test(value));
			return res.status(200).json(matchedMembers);
		}

		const paginatedMembers = paginateConetnt(members, page, limit);
		return res.status(200).json(paginatedMembers);
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
};

boardService.getBoardMember = async (req, res) => {
	const { boardId, userId } = req.params;
	try {
		const foundBoard = await Board.findOne({ _id: boardId }, "_id members");
		const foundMember = foundBoard.members.find(
			({ user }) => user.toLocaleString() === userId.toLocaleString()
		);
		return res.status(200).json({ member: foundMember });
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
};

boardService.removeUserFromBoard = async (req, res) => {
	const { boardId, userId } = req.params;
	try {
		let foundBoard = await Board.findOne({ _id: boardId }, "_id members");
		foundBoard.members = foundBoard.members.filter(
			({ user }) => user.toLocaleString() !== userId.toLocaleString()
		);
		foundBoard.save();
		return res.status(200).json({ message: "user removed from board" });
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
};

boardService.addNewUser = async (req, res) => {
	const { id } = req.params;
	const { userId } = req.query;

	try {
		const foundBoard = await Board.findOne({ _id: id }, "_id members");
		foundBoard.members.push({ user: userId });
		foundBoard.save();
		return res.status(200).json({ message: "user added to the board", boardMembers: foundBoard.members });
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
};

boardService.changeUserRole = async (req, res) => {
	const { userId, boardId } = req.params;
	const { newRole } = req.query;

	if (!newRole) {
		return res.status(400).json({ message: "role was not given" });
	}

	try {
		const foundBoard = await Board.findOne({ _id: boardId }, "_id members");
		foundBoard.members.forEach(({ user }, index) => {
			if (user._id.toLocaleString() === userId.toLocaleString()) {
				foundBoard.members[index].role = newRole;
			}
		});
		foundBoard.save();
		return res.status(200).json({ message: "role changed", role: newRole });
	} catch (error) {
		return res.status(400).json({
			message: Board.processErrors(error),
		});
	}
};

module.exports = boardService;
