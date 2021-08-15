const mockDatabase = require("../data");

module.exports = function () {
  const create = jest.fn();
  const update = jest.fn();
  const get = jest.fn();
  const deleteBoard = jest.fn();
  const removeBoardFromusersPinnedList = jest.fn();
  const userBoards = jest.fn();
  const userPinnedBoards = jest.fn();
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
