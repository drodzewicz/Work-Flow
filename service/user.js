const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userService = {};

const { SECRET_KEY } = process.env || "veri $ecret K#y";

userService.registerUser = async function (req, res) {
	const { username, password } = req.body;

	// password hashing
	const salt = await bcrypt.genSalt(10);

	if (password === undefined || typeof password !== "string") {
		return res.status(400).json({
			msg: { password: "password is required" },
		});
	}

	const hashedPassword = await bcrypt.hash(password, salt);
	const newUser = new User({ username, password: hashedPassword });
	try {
		await newUser.save();
		return res.status(201).json({
			success: true,
			msg: "sucessfully registered",
		});
	} catch (error) {
		return res.status(400).json({
			err: true,
			msg: User.processErrors(error),
		});
	}
};

userService.loginJWT = async function (req, res) {
	const { username, password } = req.body;
	try {
		const foundUser = await User.findOne({ username: username });
		const comparePasswords = await bcrypt.compare(password, foundUser.password);

		if (foundUser !== null && comparePasswords) {
			const token = jwt.sign({ id: foundUser._id }, SECRET_KEY, { expiresIn: 604800 });
			return res.status(200).json({
				token: `Bearer ${token}`,
			});
		} else {
			return res.status(404).json({
				msg: "bad login",
			});
		}
	} catch (error) {
		return res.status(400).json({
			err: true,
			msg: User.processErrors(error),
		});
	}
};

module.exports = userService;
