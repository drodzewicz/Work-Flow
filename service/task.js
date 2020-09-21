const Board = require("../models/board");
const Tag = require("../models/tag");
const Task = require("../models/task");

const taskService = {};


taskService.createTask = async (req, res) => {
	// const { boardId } = req.params;
	// try {
	// 	const foundBoard = await Board.findOne({ _id: boardId }, "columns");
	// } catch (error) {
	// 	return res.status(400).json({
	// 		message: Task.processErrors(error),
	// 	});
	// }
	return res.status(200).json({ message: "created task" });
};
taskService.getTaskbyId = async (req, res) => {
	return res.status(200).json({ message: "get task" });
};
taskService.getBoardTasks = async (req, res) => {
	return res.status(200).json({ message: "get board tasks" });
};
taskService.deleteTask = async (req, res) => {
	return res.status(200).json({ message: "delete task" });
};
taskService.updateTask = async (req, res) => {
	return res.status(200).json({ message: "update task" });
};

module.exports = taskService;
