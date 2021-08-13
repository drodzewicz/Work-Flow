const ColumnRepository = require("../../repositories/ColumnRepository");
const BoardRepository = require("../../repositories/BoardRepository");
const TaskRepository = require("../../repositories/TaskRepository");
const ColumnService = require("../../services/ColumnService");

const columnService = ColumnService({ ColumnRepository, TaskRepository, BoardRepository });

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
      const { sourceIndex, destinationIndex } = payload;
      try {
        await columnService.moveColumn(roomId, sourceIndex, destinationIndex);
        socket.to(roomId).emit("moveColumn", {
          message: "moved column",
          source: sourceIndex,
          destination: destinationIndex,
        });
      } catch (error) {
        console.log(error);
      }
    },
  };
};
