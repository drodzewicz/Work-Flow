const mongoose = require("../configs/mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	title: String,
	description: String,
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	people: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		},
	],
	tags: [{ _id: String, name: String, colorCode: String }],
});

const Task = mongoose.model("Task", taskSchema);

Task.processErrors = (err) => {
	const msg = {};
	for (const key in err.errors) {
		msg[key] = err.errors[key].message;
	}
	return msg;
};

module.exports = Task;
