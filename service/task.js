const { populate } = require("../models/board");
const Board = require("../models/board");
const Tag = require("../models/tag");
const Task = require("../models/task");

const taskService = {};

taskService.createTask = async (req, res) => {
	const { boardId } = req.params;
	const { columnId } = req.query;
	const { id: authorId } = req.user;
	const { title, description, tags, people } = req.body;
	try {
		const foundBoard = await Board.findOne({ _id: boardId }, "columns");
		const newTask = new Task({ title, description, tags, people, author: authorId });
		const savedTask = await newTask.save();
		const columnIndex = foundBoard.columns.findIndex(({ _id }) => {
			return _id.toLocaleString() === columnId.toLocaleString();
		});
		foundBoard.columns[columnIndex].tasks.push(savedTask._id);
		await foundBoard.save();
		return res.json({
			message: "created task",
			task: savedTask,
		});
	} catch (error) {
		return res.status(400).json({
			message: Task.processErrors(error),
		});
	}
};
taskService.getTaskbyId = async (req, res) => {
	const { taskId } = req.params;
	try {
		const foundTask = await Task.findOne({ _id: taskId }).populate({
			path: "people tags author",
			select: "name _id colorCode avatarImageURL username",
		});
		return res.status(200).json({ task: foundTask });
	} catch (error) {
		return res.status(400).json({
			message: Task.processErrors(error),
		});
	}
};

taskService.deleteTask = async (req, res) => {
	const { taskId, boardId } = req.params;
	try {
		await Task.findByIdAndDelete(taskId);
		await Board.findOneAndUpdate({ _id: boardId }, { $pull: { columns: { tasks: { _id: taskId } } } });
		return res.json({ task: test });
	} catch (error) {
		return res.status(400).json({
			message: Task.processErrors(error),
		});
	}
};
taskService.updateTask = async (req, res) => {
	const { taskId } = req.params;
	const { title, description, tags, people } = req.body;
	try {
		const updatedTask = await Task.findOneAndUpdate({_id: taskId}, { title, description, tags, people }, {new: true});
		return res.status(200).json({ message: "task updated", task: updatedTask });
	} catch (error) {
		return res.status(400).json({
			message: Task.processErrors(error),
		});
	}
};
taskService.moveTask = async (req, res) => {
	const { source, destination } = req.body;
	const { boardId } = req.params;
	try {
		const foundBoard = await Board.findOne({ _id: boardId }, "columns");
		const movingTask = foundBoard.columns[source.columnIndex].tasks.splice(source.taskIndex, 1)[0];
		foundBoard.columns[destination.columnIndex].tasks.splice(destination.taskIndex, 0, movingTask);
		await foundBoard.save();
		return res.status(200).json({ message: "tasked moved" });
	} catch (error) {
		return res.status(400).json({
			message: Task.processErrors(error),
		});
	}
};

module.exports = taskService;
