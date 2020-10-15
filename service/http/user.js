const User = require("../../models/user");
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
			error: true,
			message: User.processErrors(error),
		});
	}
};
userService.loginJWT = async (req, res) => {
	const { username, password } = req.body;
	try {
		const foundUser = await User.findOne({ username: username }, "_id username name surname avatarImageURL password");
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
			error: true,
			message: User.processErrors(error),
		});
	}
};
userService.isAuthenticated = async (req, res) => {
	const { id } = req.user;

	try {
		const foundUser = await User.findOne({ _id: id }, "_id username name surname avatarImageURL email");
		return res.status(200).json({
			authorized: true,
			user: foundUser,
		});
	} catch (error) {
		return res.status(404).json({
			authorized: false,
			message: User.processErrors(error),
		});
	}
};
userService.changePassword = async function (req, res) {
	const { id } = req.user;
	const { newPassword, matchPassword } = req.body;

	try {
		const foundUser = await User.findById(id);

		if (newPassword !== matchPassword) {
			return res.status(400).json({ message: { matchPassword: "does not match password" } });
		}

		const comparePasswords = await bcrypt.compare(newPassword, foundUser.password);
		if (comparePasswords) {
			return res.status(400).json({ message: { newPassword: "can't use same password" } });
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);
		foundUser.password = hashedPassword;
		foundUser.save();

		return res.status(200).json({ message: "password successfully chnaged" });
	} catch (error) {
		return res.status(400).json({
			msg: User.processErrors(error),
		});
	}
};
userService.changeAvatarImage = async function (req, res) {
	const { imageURL } = req.body;
	const { id } = req.user;
	try {
		await User.findOneAndUpdate(
			{ _id: id },
			{ avatarImageURL: imageURL },
			{ runValidators: true, context: "query" }
		);
		return res.status(200).json({ message: "avatar succefully updated" });
	} catch (error) {
		return res.status(400).json({
			msg: User.processErrors(error),
		});
	}
};
userService.updateCredentials = async function (req, res) {
	const { id } = req.user;
	try {
		await User.findOneAndUpdate({ _id: id }, { ...req.body }, { runValidators: true, context: "query" });
		return res.status(200).json({ updated: true });
	} catch (error) {
		return res.status(400).json({
			message: User.processErrors(error),
		});
	}
};
userService.searchUserByRegex = async function (req, res) {
	const { username: loggedInUser } = req.user;
	const { username } = req.query;
	try {
		const foundUsers = await User.find({ username: { $regex: username, $options: "i" } });
		return res.status(200).json(
			foundUsers
				.filter(({ username }) => username !== loggedInUser)
				.map(({ _id, username, avatarImageURL }) => ({ _id, username, avatarImageURL }))
		);
	} catch (error) {
		return res.status(400).json({
			message: User.processErrors(error),
		});
	}
};

module.exports = userService;
