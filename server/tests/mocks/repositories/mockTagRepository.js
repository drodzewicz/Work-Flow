const mockDatabase = require("../data");
const { deepCopy } = require("../utils");

module.exports = function () {
  const create = jest.fn().mockReturnValue(deepCopy(mockDatabase.tags[0]));
  const update = jest.fn();
  const deleteTag = jest.fn();
  const getBoardTags = jest.fn().mockReturnValue(deepCopy(mockDatabase.tags));
  const deleteMany = jest.fn();
  const removeTagfromBoard = jest.fn();
  const addTagToBoard = jest.fn();

  return {
    create,
    update,
    delete: deleteTag,
    getBoardTags,
    deleteMany,
    removeTagfromBoard,
    addTagToBoard,
  };
};
