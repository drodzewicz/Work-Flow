module.exports = (NotificationRepository) => {
  return {
    getUserNotifications: async (userId) => {
      return await NotificationRepository.getUserNotifications(userId);
    },
    removeNotification: async (userId, notificationId) => {
      await NotificationRepository.removeNotification(userId, notificationId);
    },
  };
};
