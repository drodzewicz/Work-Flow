const Task = require("../models/task");

module.exports = {
  get: async (taskId) => {
    return await Task.findOne({ _id: taskId }).populate({
      path: "people tags author",
      select: "name _id color avatarImageURL username",
    });
  },
  deleteMany: async (boardId) => {
    await Task.deleteMany({ board: boardId });
  },
  update: async (taskId, taskData) => {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      { ...taskData },
      { new: true, useFindAndModify: false }
    );
    return await updatedTask
      .populate("people tags author", "username avatarImageURL name color")
      .execPopulate();
  },
};
