
const Board = require("../../models/board");
const User = require("../../models/user");
const paginateConetnt = require("../../helper/pagination");
const processErrors = require("../../helper/errorHandler");
const { findOne } = require("../../models/board");

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
		await Board.findOneAndUpdate({ _id: boardId }, { $push: { members: { user: userId } } }, { useFindAndModify: false });
		const foundBoard = await Board.findOne({ _id: boardId}, "name")
		const notification = { title: foundBoard.name, info: "you have been added to the board", url: `/board/${boardId}` }
		await User.findOneAndUpdate({ "_id": userId }, { $push: { notifications:  notification} })
		return res.status(200).json({ message: "user added to the board" });
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
		const foundBoard = await Board.findOne({ _id: boardId }, "_id members name");
		const foundUSer = await User.findOne({ _id: userId }, "_id notifications");
		foundBoard.members.forEach(({ user }, index) => {
			if (user._id.toLocaleString() === userId.toLocaleString()) {
				foundBoard.members[index].role = newRole;
			}
		});
		await foundBoard.save();
		foundUSer.notifications.push({ title: foundBoard.name, info: `assigned new role - ${newRole}` })
		await foundUSer.save();
		return res.status(200).json({ message: "role changed", role: newRole });
	} catch (error) {
		return res.status(400).json({
			message: processErrors(error),
		});
	}
};



module.exports = boardMemberService;