const ColumnRepository = require("../../repositories/ColumnRepository");
const BoardRepository = require("../../repositories/BoardRepository");
const TaskRepository = require("../../repositories/TaskRepository");
const makeColumnService = require("../../services/ColumnService");

const columnService = makeColumnService(ColumnRepository, TaskRepository, BoardRepository);

module.exports = (io, socket) => {
  return {
    createColumn: async (data, call) => {
      const { roomId, payload } = data;
      const { name } = payload;
      try {
        const newColumn = await columnService.createColumn(roomId, name);
        io.in(roomId).emit("createNewColumn", newColumn);
        call({ message: "created column", newColumn });
      } catch (error) {
        call({ error });
      }
    },
    deleteColumn: async (data) => {
      const { roomId, payload } = data;
      const { columnId, columnIndex } = payload;
      try {
        await columnService.deleteColumn(roomId, columnId);
        io.in(roomId).emit("deleteColumn", { message: "deleted column", index: columnIndex });
      } catch (error) {}
    },
    moveColumn: async (data) => {
      const { roomId, payload } = data;
      const { boardId, sourceIndex, destinationIndex } = payload;
      try {
        await columnService.moveColumn(boardId, sourceIndex, destinationIndex);
        socket.to(roomId).emit("moveColumn", {
          message: "moved column",
          source: sourceIndex,
          destination: destinationIndex,
        });
      } catch (error) {}
    },
  };
};
