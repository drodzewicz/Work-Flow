const UserService = require("../../services/UserService");
const UserRepository = require("../../repositories/UserRepository");

const userService = UserService({ UserRepository });

module.exports = {
  registerUser: async (req, res, next) => {
    try {
      await userService.register(req.body);
      return res.status(201).json({ message: "sucessfully registered" });
    } catch (error) {
      next(error);
    }
  },

  loginJWT: async (req, res, next) => {
    try {
      const { token, user } = await userService.login(req.body);
      return res.status(200).json({
        token: `Bearer ${token}`,
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  getUser: async (req, res, next) => {
    try {
      const { id } = req.user;
      const user = await userService.getUser(id);

      return res.status(200).json({
        authorized: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  changePassword: async (req, res, next) => {
    const { id } = req.user;
    const { newPassword, matchPassword } = req.body;

    try {
      await userService.changePassword(id, { newPassword, matchPassword });

      return res.status(200).json({ message: "password successfully changed" });
    } catch (error) {
      next(error);
    }
  },

  changeAvatarImage: async (req, res, next) => {
    try {
      const { imageURL } = req.body;
      const { id } = req.user;

      await userService.changeAvatarImage(id, imageURL);

      return res.status(200).json({ message: "avatar image updated" });
    } catch (error) {
      next(error);
    }
  },

  updateCredentials: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { email, name, surname } = req.body;
      await userService.updateUserInfo(id, { email, name, surname });

      return res.status(200).json({ updated: true });
    } catch (error) {
      next(error);
    }
  },

  searchUserByRegex: async (req, res, next) => {
    try {
      const { username: loggedInUser } = req.user;
      const { username } = req.query;
      const users = await userService.matchUserByRegex(username);
      const parsedUsers = users.filter(({ username }) => username !== loggedInUser);

      return res.status(200).json(parsedUsers);
    } catch (error) {
      next(error);
    }
  },
};
