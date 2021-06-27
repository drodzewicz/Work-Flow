const mongoose = require("../configs/mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema({
	name: {
		type: String,
		required: [true, "username is required"],
		minlength: [3, "must not be less that 3 charatcters"],
		maxlength: [25, "must not be longer than 25 characters"],
	},
	description: {
		type: String,
		maxlength: [400, "must not be longer than 400 characters"],
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	members: [
		{
			_id: false,
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
			role: {
				type: String,
				default: "REGULAR",
			},
		},
	],
	tags: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Tag",
		},
	],
	columns: [
		{
			name: String,
			tasks: [
				{
					_id: false,
					type: mongoose.Schema.Types.ObjectId,
					ref: "Task",
				},
			],
		},
	],
	timeCreated: {
		type: Date,
		default: new Date()
    },
});

module.exports = mongoose.model("Board", boardSchema);
