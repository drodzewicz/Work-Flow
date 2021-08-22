const ColumnService = require("../../services/ColumnService");
const ColumnRepository = require("../../repositories/ColumnRepository");
const BoardRepository = require("../../repositories/BoardRepository");
const TaskRepository = require("../../repositories/TaskRepository");

const columnService = ColumnService({ ColumnRepository, TaskRepository, BoardRepository });

module.exports = {
  getBoardColumns: async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const columns = await columnService.getBoardColumns(boardId);
      return res.status(200).json({ columns });
    } catch (error) {
      next(error);
    }
  },
  updateColumnName: async (req, res, next) => {
    try {
      const { boardId, columnId } = req.params;
      const { name } = req.body;
      await columnService.updateColumnName(boardId, columnId, name);
      return res.status(200).json({ message: "updated column name" });
    } catch (error) {
      next(error);
    }
  },
};
