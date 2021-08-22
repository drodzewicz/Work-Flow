const mockDatabase = require("../data");
const { mongoObject, deepCopy } = require("../utils");

module.exports = function () {
  const create = jest.fn();
  const update = jest.fn();
  const get = jest.fn().mockReturnValue(deepCopy(mockDatabase.fullBoard));
  const deleteBoard = jest.fn();
  const save = jest.fn();
  const removeBoardFromusersPinnedList = jest.fn();
  const userBoards = jest
    .fn()
    .mockReturnValue(deepCopy(mockDatabase.boards).map((board) => mongoObject(board)));
  const userPinnedBoards = jest
    .fn()
    .mockReturnValue(deepCopy(mockDatabase.pinnedBoards).map((board) => mongoObject(board)));
  const pinBoard = jest.fn();
  const unpinBoard = jest.fn();

  return {
    create,
    update,
    get,
    save,
    delete: deleteBoard,
    removeBoardFromusersPinnedList,
    userBoards,
    userPinnedBoards,
    pinBoard,
    unpinBoard,
  };
};
