const Board = require("../models/board");

module.exports = {
  create: async (boardId, columnData) => {
    const foundBoard = await Board.findOne({ _id: boardId }, "columns");
    foundBoard.columns.push(columnData);
    const savedBoard = await foundBoard.save();
    const newColumn = savedBoard.columns.pop();
    return newColumn;
  },
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
  delete: async (boardId, columnId) => {
    return await Board.findOneAndUpdate(
      { _id: boardId },
      { $pull: { columns: { _id: columnId } } }
    );
  },
  move: async (boardId, sourceIndex, destinationIndex) => {
    const foundBoard = await Board.findOne({ _id: boardId }, "columns");
    const movedColumn = foundBoard.columns.splice(sourceIndex, 1)[0];
    foundBoard.columns.splice(destinationIndex, 0, movedColumn);
    await foundBoard.save();
  },
  getColumnTasks: async (boardId, columnId) => {
    const { columns } = await Board.findOne({ _id: boardId }, "columns");
    const foundColumn = columns.find(
      ({ _id }) => _id.toLocaleString() === columnId.toLocaleString()
    );
    if (!foundColumn) {
      return [];
    }
    return foundColumn.tasks;
  },
  updateName: async (boardId, columnId, name) => {
    return await Board.findOneAndUpdate(
      { _id: boardId, "columns._id": columnId },
      { $set: { "columns.$.name": name } }
    );
  },
};
