
const Board = require("../../models/board");
const paginateConetnt = require("../../helper/pagination");
const processErrors = require("../../helper/errorHandler");

const boardMemberService = {};


boardMemberService.getBoardMembers = async (req, res) => {
	const { boardId } = req.params;
	const { page, limit } = req.query;
	const { username } = req.query;

	try {
		const { members } = await Board.findOne({ _id: boardId }, "members").populate({
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
			message: processErrors(error),
		});
	}
};
boardMemberService.getBoardMember = async (req, res) => {
	const { boardId, userId } = req.params;
	try {
		const foundBoard = await Board.findOne({ _id: boardId }, "_id members");
		const foundMember = foundBoard.members.find(
			({ user }) => user.toLocaleString() === userId.toLocaleString()
		);
		return res.status(200).json({ member: foundMember });
	} catch (error) {
		return res.status(400).json({
			message: processErrors(error),
		});
	}
};
boardMemberService.removeUserFromBoard = async (req, res) => {
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
			message: processErrors(error),
		});
	}
};
boardMemberService.addNewUser = async (req, res) => {
	const { boardId } = req.params;
	const { userId } = req.query;

	try {
		const foundBoard = await Board.findOne({ _id: boardId }, "_id members");
		foundBoard.members.push({ user: userId });
		foundBoard.save();
		return res.status(200).json({ message: "user added to the board", boardMembers: foundBoard.members });
	} catch (error) {
		return res.status(400).json({
			message: processErrors(error),
		});
	}
};
boardMemberService.changeUserRole = async (req, res) => {
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
			message: processErrors(error),
		});
	}
};



module.exports = boardMemberService;