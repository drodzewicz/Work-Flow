const mockDatabase = require("../data");

module.exports = function () {
  const create = jest.fn().mockReturnValue(mockDatabase.tasks[0]);
  const get = jest.fn();
  const update = jest.fn();
  const deleteTask = jest.fn();
  const deleteMany = jest.fn();
  const deleteBoardTasks = jest.fn();
  const removeTaskFromColumn = jest.fn();
  const addTaskToColumn = jest.fn();

  return {
    create,
    get,
    update,
    delete: deleteTask,
    deleteMany,
    deleteBoardTasks,
    removeTaskFromColumn,
    addTaskToColumn
  };
};
