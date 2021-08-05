const Board = require("../models/board");

module.exports = {
  get: async (boardId) => {
    const { columns } = await Board.findOne({ _id: boardId }, "columns").populate({
      path: "columns",
      populate: {
        path: "tasks",
        populate: {
          path: "people tags",
          select: "_id username avatarImageURL color name",
        },
      },
    });
    return columns;
  },
  updateName: async (boardId, columnId, name) => {
    return await Board.findOneAndUpdate(
      { _id: boardId, "columns._id": columnId },
      { $set: { "columns.$.name": name } }
    );
  },
};
