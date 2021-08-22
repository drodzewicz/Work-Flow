const Board = require("../models/board");
const User = require("../models/user");

module.exports = {
  create: async ({ name, description, members, author }) => {
    const newBoard = new Board({ name, description, members, author });
    return await newBoard.save();
  },
  update: async (boardId, { name, description }) => {
    return await Board.findOneAndUpdate({ _id: boardId }, { name, description });
  },
  get: async (boardId, fields) => {
    fields = fields || "_id name description author columns";
    return await Board.findOne({ _id: boardId }, fields).populate({
      path: "columns",
      populate: {
        path: "tasks",
        populate: {
          path: "people tags",
          select: "_id username avatarImageURL color name",
        },
      },
    });
  },
  delete: async (boardId) => {
    await Board.findByIdAndDelete(boardId);
  },
  save: async (board) => {
    await board.save();
  },
  removeBoardFromusersPinnedList: async (boardId) => {
    await User.updateMany({ pinnedBoards: boardId }, { $pull: { pinnedBoards: boardId } });
  },
  userBoards: async (userId) => {
    return await Board.find(
      { "members.user": userId },
      "description name _id author"
    ).sort({ timeCreated: -1 });
  },
  userPinnedBoards: async (userId) => {
    const { pinnedBoards } = await User.findById(userId).populate({
      path: "pinnedBoards",
      select: "description name _id author",
    });
    return pinnedBoards;
  },
  pinBoard: async (userId, boardId) => {
     await User.findOneAndUpdate({ _id: userId }, { $push: { pinnedBoards: boardId } });
  },
  unpinBoard: async (userId, boardId) => {
    await User.findOneAndUpdate({ _id: userId }, { $pull: { pinnedBoards: boardId } });
  },
};
