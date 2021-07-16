const Task = require("../../models/task");

const taskService = {};

taskService.getTaskbyId = async (req, res) => {
  const { taskId } = req.params;
  try {
    const foundTask = await Task.findOne({ _id: taskId }).populate({
      path: "people tags author",
      select: "name _id color avatarImageURL username",
    });
    return res.status(200).json({ task: foundTask });
  } catch (error) {
    next(error);
  }
};
taskService.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, tags, people } = req.body;
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      { title, description, tags, people },
      { new: true, useFindAndModify: false }
    );
    const task = await updatedTask
      .populate("people tags author", "username avatarImageURL name color")
      .execPopulate();
    return res.status(200).json({ message: "task updated", task: task });
  } catch (error) {
    next(error);
  }
};

module.exports = taskService;
