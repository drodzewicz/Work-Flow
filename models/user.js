const mongoose = require("../configs/mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const validateEmail = (email) => {
	const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};

const userSchema = new Schema({
	username: {
		type: String,
		required: [true, "username is required"],
		unique: [true, "username is not available"],
		minlength: [3, "must not be less that 3 charatcters"],
		maxlength: [20, "must not be longer than 20 characters"],
	},
	password: {
		type: String,
		minlength: [4, "must not be less that 4 charatcters"],
		required: [true, "password is required"],
	},
	name: {
		type: String,
		required: [true, "name is required"],
	},
	surname: {
		type: String,
		minlength: [4, "must not be less that 4 charatcters"],
		required: [true, "surname is required"],
	},
	email: {
		type: String,
		unique: [true, "this email is registered to a different account"],
		required: [true, "email is required"],
		validate: [validateEmail, "please fill a valid email address"],
	},
	avatarImageURL: {
		type: String,
	},
	pinnedBoards: [
		{
            _id: false,
			type: mongoose.Schema.Types.ObjectId,
			ref: "Board",
		},
	],
});

userSchema.plugin(uniqueValidator, { message: "{VALUE} is not available" });

userSchema.methods.isValidPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

User.processErrors = (err) => {
	const msg = {};
	for (const key in err.errors) {
		msg[key] = err.errors[key].message;
	}
	if (err.errmsg !== undefined && err.errmsg.indexOf("dup key") > -1) {
		msg.username = "username is unavailable";
	}
	return msg;
};

module.exports = User;
