const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userService = {};

const { SECRET_KEY } = process.env || "veri $ecret K#y";

userService.registerUser = async (req, res) => {
	const { username, password, name, surname, email } = req.body;

	// password hashing
	const salt = await bcrypt.genSalt(10);

	if (password === undefined || typeof password !== "string") {
		return res.status(400).json({
			message: { password: "password is required" },
		});
	}

	const hashedPassword = await bcrypt.hash(password, salt);
	const newUser = new User({ username, password: hashedPassword, name, surname, email });
	try {
		await newUser.save();
		return res.status(201).json({
			message: "sucessfully registered",
		});
	} catch (error) {
		return res.status(400).json({
			message: User.processErrors(error),
		});
	}
};

userService.loginJWT = async (req, res) => {
	const { username, password } = req.body;
	try {
		const foundUser = await User.findOne({ username: username });
		const comparePasswords = await bcrypt.compare(password, foundUser.password);

		if (foundUser !== null && comparePasswords) {
			const token = jwt.sign({ id: foundUser._id }, SECRET_KEY, { expiresIn: 604800 });
			return res.status(200).json({
				token: `Bearer ${token}`,
				user: foundUser,
			});
		} else {
			return res.status(404).json({
				message: "bad login",
			});
		}
	} catch (error) {
		return res.status(400).json({
			err: true,
			msg: User.processErrors(error),
		});
	}
};

userService.isAuthenticated = async (req, res) => {
	const { id } = req.user;
	
	try {
		const foundUser = await User.findById(id);
		const { _id, username, email, name, surname, avatarImageURL } = foundUser;
		return res.status(200).json({
			authorized: true,
			user: { id: _id, username, email, name, surname, avatarImageURL },
		});
	} catch (error) {
		return res.status(404).json({
			authorized: false,
			message: User.processErrors(error),
		});
	}
};

userService.changePassword = async function (req, res) {
	return res.status(200).json({ message: "chnage password temp route" });
};

userService.changeAvatarImage = async function (req, res) {
	return res.status(200).json({ message: "chnage avatar temp route" });
};

userService.updateCredentials = async function (req, res) {
	return res.status(200).json({ message: " udpate credentials temp route" });
};

module.exports = userService;
