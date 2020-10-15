const Task = require("../../models/task");

const taskService = {};

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
taskService.updateTask = async (req, res) => {
	const { taskId } = req.params;
	const { title, description, tags, people } = req.body;
	try {
		const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, { title, description, tags, people }, { new: true });
		return res.status(200).json({ message: "task updated", task: updatedTask });
	} catch (error) {
		return res.status(400).json({
			message: Task.processErrors(error),
		});
	}
};

module.exports = taskService;
