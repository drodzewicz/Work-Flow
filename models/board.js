const mongoose = require("../configs/mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema({
	name: {
		type: String,
		required: [true, "username is required"],
		minlength: [3, "must not be less that 3 charatcters"],
		maxlength: [20, "must not be longer than 20 characters"],
	},
	description: {
		type: String,
		maxlength: [200, "must not be longer than 200 characters"],
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
				default: "regular",
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
