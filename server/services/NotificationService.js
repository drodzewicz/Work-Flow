module.exports = function ({ NotificationRepository }) {
  async function getUserNotifications(userId) {
    return await NotificationRepository.getUserNotifications(userId);
  }

  async function removeNotification(userId, notificationId) {
    await NotificationRepository.removeNotification(userId, notificationId);
  }
  return {
    getUserNotifications,
    removeNotification,
  };
};
