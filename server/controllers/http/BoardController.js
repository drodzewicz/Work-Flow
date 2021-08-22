const BoardService = require("../../services/BoardService");
const MembersService = require("../../services/MembersService");
const BoardRepository = require("../../repositories/BoardRepository");
const TagRepository = require("../../repositories/TagRepository");
const TaskRepository = require("../../repositories/TaskRepository");

const boardService = BoardService({ BoardRepository, TaskRepository, TagRepository });
const membersService = MembersService({ BoardRepository });

module.exports = {
  createBoard: async (req, res, next) => {
    try {
      const { id: authorId } = req.user;
      const newBoard = await boardService.createBoard(req.body, authorId);

      return res.json({
        message: "new board successfuly created",
        board: newBoard,
      });
    } catch (error) {
      next(error);
    }
  },
  updateBoard: async (req, res, next) => {
    try {
      const { boardId } = req.params;
      await boardService.updateBoard(req.body, boardId);
      return res.json({
        boardId,
        message: "board successfuly updated",
      });
    } catch (error) {
      next(error);
    }
  },
  getLoggednInUserBoards: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { page, limit } = req.query;
      const { boards, prev, next, totalPageCount } = await boardService.getUserBoards(id, {
        page,
        limit,
      });

      return res.json({ boards, prev, next, totalPageCount });
    } catch (error) {
      next(error);
    }
  },
  getLoggednInUserPinnedBoards: async (req, res, next) => {
    try {
      const { id } = req.user;
      const boards = await boardService.getUserPinnedBoards(id);
      return res.status(200).json({ boards });
    } catch (error) {
      next(error);
    }
  },
  getBoard: async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const { short } = req.query;
      const showShortBoard = short === "true";
      const board = await boardService.getBoard(boardId, showShortBoard);
      return res.status(200).json(board);
    } catch (error) {
      next(error);
    }
  },
  togglePinBoard: async (req, res, next) => {
    try {
      const { boardId } = req.query;
      const { id } = req.user;
      const { pinned } = await boardService.togglePinBoard(id, boardId);

      return res.status(200).json({
        message: `${pinned ? "pinned" : "unpinned"} board with id: ${boardId}`,
        pinned,
        boardId,
      });
    } catch (error) {
      next(error);
    }
  },
  deleteBoard: async (req, res, next) => {
    try {
      const { boardId } = req.params;
      await boardService.deleteBoard(boardId);
      return res.status(200).json({ message: `successfully deleted board with id: ${boardId}` });
    } catch (error) {
      next(error);
    }
  },
  leaveBoard: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { boardId } = req.params;

      await membersService.removeUserFromBoard(boardId, id);

      return res.status(200).json({ message: `successfully left board of id: ${boardId}` });
    } catch (error) {
      next(error);
    }
  },
};
