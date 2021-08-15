const mockDatabase = require("../data");
const { mongoObject } = require("../utils");

module.exports = function () {
  const create = jest.fn();
  const update = jest.fn();
  const get = jest.fn();
  const deleteBoard = jest.fn();
  const removeBoardFromusersPinnedList = jest.fn();
  const userBoards = jest
    .fn()
    .mockReturnValue(mockDatabase.boards.map((board) => mongoObject(board)));
  const userPinnedBoards = jest
    .fn()
    .mockReturnValue(mockDatabase.pinnedBoards.map((board) => mongoObject(board)));
  const pinBoard = jest.fn();
  const unpinBoard = jest.fn();

  return {
    create,
    update,
    get,
    delete: deleteBoard,
    removeBoardFromusersPinnedList,
    userBoards,
    userPinnedBoards,
    pinBoard,
    unpinBoard,
  };
};
