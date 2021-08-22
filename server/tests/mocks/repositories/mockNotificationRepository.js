const mockDatabase = require("../data");
const { mongoObject } = require("../utils");

module.exports = function () {
  const getUserNotifications = jest.fn().mockReturnValue([]);
  const addNotification = jest.fn();
  const addNotificationToManyUsers = jest.fn();
  const removeNotification = jest.fn();


  return {
    getUserNotifications,
    addNotification,
    addNotificationToManyUsers,
    removeNotification
  };
};
