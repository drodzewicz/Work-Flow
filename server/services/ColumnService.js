module.exports = (ColumnRepository, TaskRepository, BoardRepository) => {
  return {
    createColumn: async (boardId, columnName) => {
      const columns = await ColumnRepository.get(boardId);
      const columnData = { name: columnName, columnIndex: columns.length };
      return await ColumnRepository.create(boardId, columnData);
    },
    deleteColumn: async (boardId, columnId) => {
      const columnTasks = await ColumnRepository.getColumnTasks(boardId, columnId);
      await TaskRepository.deleteMany(columnTasks);
      await ColumnRepository.delete(boardId, columnId);
    },
    moveColumn: async (boardId, sourceIndex, destinationIndex) => {
        const foundBoard = await BoardRepository.get(boardId);
        const movedColumn = foundBoard.columns.splice(sourceIndex, 1)[0];
        foundBoard.columns.splice(destinationIndex, 0, movedColumn);
        await foundBoard.save();
    },
    getBoardColumns: async (boardId) => {
      return await ColumnRepository.get(boardId);
    },
    updateColumnName: async (boardId, columnId, newName) => {
      return await ColumnRepository.updateName(boardId, columnId, newName);
    },
  };
};
