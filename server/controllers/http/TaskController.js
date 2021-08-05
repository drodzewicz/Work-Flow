const TaskRepository = require("../../repositories/TaskRepository");
const makeTaskService = require("../../services/TaskService");

const taskService = makeTaskService(TaskRepository);

module.exports = {
  getTask: async (req, res, next) => {
    try {
      const { taskId } = req.params;
      const task = await taskService.getTask(taskId);
      return res.status(200).json({ task });
    } catch (error) {
      next(error);
    }
  },
  updateTask: async (req, res, next) => {
    try {
      const { taskId } = req.params;
      const task = await taskService.updateTask(taskId, req.body);
      return res.status(200).json({ message: "task updated", task });
    } catch (error) {
      next(error);
    }
  },
};
