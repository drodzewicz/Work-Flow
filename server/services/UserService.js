const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requiredValues = require("../helper/requiredValues");
const { AuthError, ResponseError } = require("../error/");
const ENV_CONF = require("../configs/env.conf");

module.exports = (UserRepository) => {
  return {
    register: async (userData) => {
      const { username, password, name, surname, email } = userData;

      const salt = await bcrypt.genSalt(10);

      requiredValues(["password"], userData);

      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = { username, password: hashedPassword, name, surname, email };

      return await UserRepository.createUser(newUser);
    },

    login: async (loginCredentials) => {
      requiredValues(["username", "password"], loginCredentials);

      let foundUser = await UserRepository.getUserByUsername(loginCredentials.username);
      if (foundUser === null) {
        throw new ResponseError({ username: "user with such username does not exist" }, 404);
      }
      const { password, ...user } = foundUser.toObject();

      const isPasswordMatch = await bcrypt.compare(loginCredentials.password, password);
      if (!isPasswordMatch) {
        throw AuthError.badLogin();
      }
      const token = jwt.sign({ id: user._id }, ENV_CONF.SECRET_KEY, { expiresIn: 604800 });
      return { token, user };
    },

    getUser: async (userId) => {
      const userFields = "_id username name surname avatarImageURL email";
      const foundUser = await UserRepository.getUserById(userId, userFields);
      if (foundUser === null) {
        throw new ResponseError("user with such id does not exist", 404);
      }
      return foundUser;
    },

    changePassword: async (userId, { newPassword, matchPassword }) => {
      requiredValues(["newPassword", "matchPassword"], { newPassword, matchPassword });

      if (newPassword !== matchPassword) {
        const message = { matchPassword: "does not match password" };
        throw new ResponseError(message, 400);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      return await UserRepository.updateUser(userId, { password: hashedPassword });
    },

    changeAvatarImage: async (userId, imageURL) => {
      requiredValues(["imageURL"], { imageURL });
      return await UserRepository.updateUser(userId, { avatarImageURL: imageURL });
    },

    updateUserInfo: async (userId, userData) => {
      return await UserRepository.updateUser(userId, userData);
    },
    
    matchUserByRegex: async (username) => {
      return await UserRepository.getUsersByMatchUsername(username);
    },
  };
};
