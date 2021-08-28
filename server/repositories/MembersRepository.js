const Board = require("../models/board");

module.exports = {
  getMembers: async (boardId, fields) => {
    fields = fields || "_id username avatarImageURL";
    const { members } = await Board.findOne({ _id: boardId }, "members").populate({
      path: "members",
      populate: {
        path: "user",
        select: fields,
      },
    });
    return members;
  },
  addMember: async (boardId, userId) => {
    await Board.findOneAndUpdate(
      { _id: boardId },
      { $push: { members: { user: userId } } },
      { useFindAndModify: false }
    );
  },
  removeMember: async (boardId, userId) => {
    const foundBoard = await Board.findById(boardId);

    foundBoard.members = foundBoard.members.filter(
      ({ user }) => user.toLocaleString() !== userId.toLocaleString()
    );
    foundBoard.save();
    return foundBoard.members;
  },
  updateMemberRole: async (boardId, userId, newRole) => {
    const foundBoard = await Board.findById(boardId);
    const foundUserIndex = foundBoard.members.findIndex(
      ({ user }) => user.toLocaleString() === userId.toLocaleString()
    );
    if (foundUserIndex > -1) foundBoard.members[foundUserIndex].role = newRole;
    await foundBoard.save();
  },
};
