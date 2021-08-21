const mockDatabase = require("../data");
const { deepCopy } = require("../utils");

module.exports = function () {
  const create = jest.fn().mockReturnValue(deepCopy(mockDatabase.tasks[0]));
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
    addTaskToColumn,
  };
};
