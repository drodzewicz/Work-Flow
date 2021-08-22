const MembersService = require("../services/MembersService");
const errorHandler = require("../error/errorHandler");

module.exports = function ({ MembersRepository }) {
  const membersService = MembersService({ MembersRepository });

  async function isBoardAuthor(req, res, next) {
    const { boardId } = req.params;
    const { id } = req.user;
    try {
      const member = await membersService.getBoardMember(boardId, id);
      if (member.role !== "OWNER") {
        throw new AuthError();
      }
      next();
    } catch (error) {
      const { status, message } = errorHandler(error);
      return res.status(status || 400).json({ message });
    }
  }

  async function isBoardMember(req, res, next) {
    const { boardId } = req.params;
    const { id } = req.user;
    try {
      await membersService.getBoardMember(boardId, id);
    } catch (error) {
      const { status, message } = errorHandler(error);
      return res.status(status || 400).json({ message });
    }
    return next();
  }

  async function isBoardAdmin(req, res, next) {
    const { boardId } = req.params;
    const { id } = req.user;
    try {
      const member = await membersService.getBoardMember(id, boardId);
      if (!["ADMIN", "OWNER"].includes(member.role)) {
        throw new AuthError();
      }
      next();
    } catch (error) {
      const { status, message } = errorHandler(error);
      return res.status(status || 400).json({ message });
    }
  }

  return {
    isBoardAuthor,
    isBoardMember,
    isBoardAdmin,
  };
};
