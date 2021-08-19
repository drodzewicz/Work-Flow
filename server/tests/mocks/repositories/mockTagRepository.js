const mockDatabase = require("../data");

module.exports = function () {
  const create = jest.fn();
  const update = jest.fn();
  const deleteTag = jest.fn();
  const getBoardTags = jest.fn().mockReturnValue(mockDatabase.tags);
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
    addTagToBoard
  };
};
