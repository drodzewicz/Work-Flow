const User = require("../models/user");

module.exports = {
  getUserNotifications: async (userId) => {
    const { notifications } = await User.findOne({ _id: userId }, "notifications");
    return notifications;
  },
  addNotification: async (userId, notification) => {
    await User.findOneAndUpdate({ _id: userId }, { $push: { notifications: notification } });
  },
  addNotificationToManyUsers: async (userIds, notification) => {
      await User.updateMany({ _id: { $in: userIds } }, { $push: { notifications: notification } });
  },
  removeNotification: async (userId, notificationId) => {
    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { notifications: { _id: notificationId } } }
    );
  },
};
