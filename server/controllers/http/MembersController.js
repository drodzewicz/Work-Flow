const MembersService = require("../../services/MembersService");
const MembersRepository = require("../../repositories/MembersRepository");
const BoardRepository = require("../../repositories/BoardRepository");
const NotificationRepository = require("../../repositories/NotificationRepository");

const membersSrvice = MembersService({
  MembersRepository,
  BoardRepository,
  NotificationRepository,
});

module.exports = {
  getBoardMembers: async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const { page, limit } = req.query;
      const searchUsername = req.query.username || "";
      const members = await membersSrvice.getBoardMembers(boardId, { page, limit }, searchUsername);
      return res.status(200).json(members);
    } catch (error) {
      next(error);
    }
  },
  getBoardMember: async (req, res, next) => {
    try {
      const { boardId, userId } = req.params;
      const member = await membersSrvice.getBoardMember(boardId, userId);
      return res.status(200).json({ member });
    } catch (error) {
      next(error);
    }
  },
  removeUserFromBoard: async (req, res, next) => {
    try {
      const { boardId, userId } = req.params;
      await membersSrvice.removeUserFromBoard(boardId, userId);
      return res.status(200).json({ message: "user removed from board" });
    } catch (error) {
      next(error);
    }
  },
  addUserToBoard: async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const { userId } = req.query;
      await membersSrvice.addUserToBoard(boardId, userId);
      return res.status(200).json({ message: "user added to the board" });
    } catch (error) {
      next(error);
    }
  },
  changeUserRole: async (req, res, next) => {
    try {
      const { userId, boardId } = req.params;
      const { newRole } = req.query;
      await membersSrvice.changeUserRole(boardId, userId, newRole);
      return res.status(200).json({ message: "role changed", role: newRole });
    } catch (error) {
      next(error);
    }
  },
};
