const mockDatabase = require("../data");

module.exports = function () {
  
  function mongoObject(user) {
    function toObject() {
      return user;
    }
    return {
      toObject,
    };
  }

  const createUser = jest.fn();
  const getUserByUsername = jest.fn().mockReturnValue(mongoObject(mockDatabase.users[0]));
  const getUsersByMatchUsername = jest.fn().mockReturnValue(mockDatabase.users.slice(0, 3));
  const getUserById = jest.fn().mockReturnValue(mongoObject(mockDatabase.users[0]));
  const updateUser = jest.fn().mockReturnValue(mongoObject(mockDatabase.users[0]));

  const getUserByUsernameReturnsNull = jest.fn().mockReturnValue(null);
  const getUserByIdReturnsNull = jest.fn().mockReturnValue(null);

  return {
    createUser,
    getUserByUsername,
    getUsersByMatchUsername,
    getUserById,
    updateUser,
    getUserByUsernameReturnsNull,
    getUserByIdReturnsNull,
  };
};
