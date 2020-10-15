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
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	tags: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tag",
		},
	],
});

module.exports = mongoose.model("Task", taskSchema);
