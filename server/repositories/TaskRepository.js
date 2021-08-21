const Task = require("../models/task");
const Board = require("../models/board");

module.exports = {
  create: async (taskData) => {
    const newTask = new Task(taskData);
    return await newTask.save();
  },
  get: async (taskId) => {
    return await Task.findOne({ _id: taskId }).populate({
      path: "people tags author",
      select: "name _id color avatarImageURL username",
    });
  },
  save: async (task) => {
    await task.save();
  },
  addTaskToColumn: async (boardId, columnId, taskId) => {
    await Board.findOneAndUpdate(
      { _id: boardId, "columns._id": columnId },
      { $push: { "columns.$.tasks": { _id: taskId } } }
    );
  },
  removeTaskFromColumn: async (boardId, columnId, taskId) => {
    await Board.findOneAndUpdate(
      { _id: boardId, "columns._id": columnId },
      { $pull: { "columns.$.tasks": { _id: taskId } } }
    );
  },
  deleteBoardTasks: async (boardId) => {
    await Task.deleteMany({ board: boardId });
  },
  delete: async (taskId) => {
    await Task.findByIdAndDelete(taskId);
  },
  deleteMany: async (taskIds) => {
    await Task.deleteMany({ _id: { $in: taskIds } });
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
