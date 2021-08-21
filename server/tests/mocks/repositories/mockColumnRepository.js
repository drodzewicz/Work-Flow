const mockDatabase = require("../data");
const { mongoObject, deepCopy } = require("../utils");

module.exports = function () {
  const create = jest.fn();
  const get = jest.fn().mockReturnValue(deepCopy(mockDatabase.columns));
  const deleteColumn = jest.fn();
  const move = jest.fn();
  const getColumnTasks = jest.fn().mockReturnValue(deepCopy(mockDatabase.tasks));
  const getColumnupdateNameTasks = jest.fn();
 
  return {
    create,
    get,
    delete: deleteColumn,
    move,
    getColumnTasks,
    getColumnupdateNameTasks
  };
};
