const NotificationRepository = require("../../repositories/NotificationRepository");
const NotificationService = require("../../services/NotificationService");

const notificationService = NotificationService({ NotificationRepository });

module.exports = {
  getLoggedInUserNotifications: async (req, res, next) => {
    try {
      const { id } = req.user;
      const notifications = await notificationService.getUserNotifications(id);
      return res.status(200).json({ notifications });
    } catch (error) {
      next(error);
    }
  },
  removeLoggedInUserNotification: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { notificationId } = req.params;
      await notificationService.removeNotification(id, notificationId);
      return res.status(200).json({ message: "notification removed" });
    } catch (error) {
      next(error);
    }
  },
};
