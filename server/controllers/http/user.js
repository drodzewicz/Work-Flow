const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ENV_CONF = require("../../configs/env.conf");
const { AuthError, ResponseError } = require("../../error/");
const requiredValues = require("../../helper/requiredValues");

const userService = {};

userService.registerUser = async (req, res, next) => {
  const { username, password, name, surname, email } = req.body;

  const salt = await bcrypt.genSalt(10);

  try {
    requiredValues(["password"], req.body);

    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, password: hashedPassword, name, surname, email });

    await newUser.save();
    return res.status(201).json({ message: "sucessfully registered" });
  } catch (error) {
    next(error);
  }
};

userService.loginJWT = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    requiredValues(["username", "password"], req.body);

    let foundUser = await User.findOne(
      { username: username },
      "_id username name surname avatarImageURL password"
    );
    if (foundUser === null) {
      throw new ResponseError({ username: "user with such username does not exist" }, 404);
    }
    const { _id, name, surname, avatarImageURL, email, password: userPassword } = foundUser;

    foundUser = { _id, username, name, surname, email, avatarImageURL };

    const isPasswordMatch = await bcrypt.compare(password, userPassword);
    if (!isPasswordMatch) {
      throw AuthError.badLogin();
    }
    const token = jwt.sign({ id: _id }, ENV_CONF.SECRET_KEY, { expiresIn: 604800 });
    return res.status(200).json({
      token: `Bearer ${token}`,
      user: foundUser,
    });
  } catch (error) {
    next(error);
  }
};

userService.isAuthenticated = async (req, res) => {
  const { id } = req.user;

  try {
    const foundUser = await User.findOne(
      { _id: id },
      "_id username name surname avatarImageURL email"
    );
    if (foundUser === null) {
      throw new ResponseError("user with such id does not exist", 404);
    }
    return res.status(200).json({
      authorized: true,
      user: foundUser,
    });
  } catch (error) {
    next(error);
  }
};

userService.changePassword = async function (req, res) {
  const { id } = req.user;
  const { newPassword, matchPassword } = req.body;

  try {
    requiredValues(["newPassword", "matchPassword"], req.body);

    const foundUser = await User.findById(id);

    if (newPassword !== matchPassword) {
      const message = { matchPassword: "does not match password" };
      throw new ResponseError(message, 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    foundUser.password = hashedPassword;
    foundUser.save();

    return res.status(200).json({ message: "password successfully changed" });
  } catch (error) {
    next(error);
  }
};

userService.changeAvatarImage = async function (req, res) {
  const { imageURL } = req.body;
  const { id } = req.user;
  try {
    requiredValues(["imageURL"], req.body);

    await User.findOneAndUpdate(
      { _id: id },
      { avatarImageURL: imageURL },
      { runValidators: true, context: "query" }
    );
    return res.status(200).json({ message: "avatar image updated" });
  } catch (error) {
    next(error);
  }
};

userService.updateCredentials = async function (req, res) {
  const { id } = req.user;
  const { email, name,  surname } = req.body;
  try {
    await User.findOneAndUpdate(
      { _id: id },
      { email, name, surname },
      { runValidators: true, context: "query" }
    );
    return res.status(200).json({ updated: true });
  } catch (error) {
    next(error);
  }
};

userService.searchUserByRegex = async function (req, res) {
  const { username: loggedInUser } = req.user;
  const { username } = req.query;
  try {
    const foundUsers = await User.find(
      { username: { $regex: username, $options: "i" } },
      "_id username avatarImageURL"
    );
    const parsedUsers = foundUsers.filter(({ username }) => username !== loggedInUser);

    return res.status(200).json(parsedUsers);
  } catch (error) {
    next(error);
  }
};

module.exports = userService;
