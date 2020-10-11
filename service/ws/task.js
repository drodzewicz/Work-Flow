const Board = require("../../models/board");
const Task = require("../../models/task");
const User = require("../../models/user");

const taskSocketService = {};

taskSocketService.createTask = async (data) => {
	const { columnId, boardId, title, description, tags, people, authorId } = data;
	try {
		const foundBoard = await Board.findOne({ _id: boardId }, "columns");
		const newTask = new Task({ title, description, tags, people, author: authorId });
		const savedTask = await newTask.save();
		const columnIndex = foundBoard.columns.findIndex(({ _id }) => {
			return _id.toLocaleString() === columnId.toLocaleString();
		});
		foundBoard.columns[columnIndex].tasks.push(savedTask._id);
		const task = await savedTask.populate("people tags author").execPopulate();
		await foundBoard.save();
		return {
			success: true,
			message: "created task",
			task: { columnIndex, ...task.toObject() },
		};
	} catch (error) {
		return {
			error: true,
			message: Task.processErrors(error),
		};
	}
};

taskSocketService.deleteTask = async (data) => {
	const { taskId, boardId } = data;
	try {
		await Task.findByIdAndDelete(taskId);
		const foundBoard = await Board.findOne({ _id: boardId }, "columns");
		let index = { col: -1, task: -1 };
		for (let col in foundBoard.columns) {
			for (let task in foundBoard.columns[col].tasks) {
				if (foundBoard.columns[col].tasks[task].toLocaleString() === taskId.toLocaleString()) {
					index = { col, task };
					break;
				}
			}
			if (index.col >= 0 || index.task >= 0) break;
		}
		foundBoard.columns[index.col].tasks.splice(index.task, 1)
		await foundBoard.save();
		return { success: true, message: "task deleted", index }
	} catch (error) {
		return {
			error: true,
			message: Task.processErrors(error),
		};
	}
};
taskSocketService.moveTask = async (data) => {
	const { source, destination, boardId } = data;
	try {
		const foundBoard = await Board.findOne({ _id: boardId }, "columns");
		const movingTask = foundBoard.columns[source.columnIndex].tasks.splice(source.taskIndex, 1)[0];
		const taskId = movingTask._id;
		foundBoard.columns[destination.columnIndex].tasks.splice(destination.taskIndex, 0, movingTask);
		await foundBoard.save();
		return {
			success: true,
			message: "tasked moved",
			source, 
			destination,
			taskId
		};
	} catch (error) {
		return {
			errro: true,
			message: Task.processErrors(error),
		};
	}
};


module.exports = taskSocketService;
