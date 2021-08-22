module.exports = function ({ ColumnRepository, TaskRepository, BoardRepository }) {
  async function createColumn(boardId, columnName) {
    const columns = await ColumnRepository.get(boardId);
    const columnData = { name: columnName, columnIndex: columns.length };
    return await ColumnRepository.create(boardId, columnData);
  }
  async function deleteColumn(boardId, columnId) {
    const columnTasks = await ColumnRepository.getColumnTasks(boardId, columnId);
    await TaskRepository.deleteMany(columnTasks);
    await ColumnRepository.delete(boardId, columnId);
  }
  async function moveColumn(boardId, sourceIndex, destinationIndex) {
    const foundBoard = await BoardRepository.get(boardId);
    const movedColumn = foundBoard.columns.splice(sourceIndex, 1)[0];
    foundBoard.columns.splice(destinationIndex, 0, movedColumn);
    await BoardRepository.save(foundBoard);
  }
  async function getBoardColumns(boardId) {
    return await ColumnRepository.get(boardId);
  }
  async function updateColumnName(boardId, columnId, newName) {
    return await ColumnRepository.updateName(boardId, columnId, newName);
  }

  return {
    createColumn,
    deleteColumn,
    moveColumn,
    getBoardColumns,
    updateColumnName,
  };
};
