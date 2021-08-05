module.exports = (ColumnRepository) => {
  return {
    getBoardColumns: async (boardId) => {
      return await ColumnRepository.get(boardId);
    },
    updateColumnName: async (boardId, columnId, newName) => {
      return await ColumnRepository.updateName(boardId, columnId, newName);
    },
  };
};
