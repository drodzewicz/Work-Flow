const mockDatabase = require("../data");

const mongoUser = function (user) {
  function toObject() {
    return user;
  }
  return {
    toObject,
  };
};

const createUser = jest.fn();
const getUserByUsername = jest.fn().mockReturnValue(mongoUser(mockDatabase.users[0]));

module.exports = {
  createUser,
  getUserByUsername,
};
