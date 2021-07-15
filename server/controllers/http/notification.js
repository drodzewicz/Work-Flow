const User = require("../../models/user");

const notificationService = {};

notificationService.getMyNotifications = async (req, res) => {
  const { id } = req.user;
  try {
    const foundUser = await User.findOne({ _id: id }, "notifications");
    return res.status(200).json({ notifications: foundUser.notifications });
  } catch (error) {
    next(error);
  }
};
notificationService.removeNotification = async (req, res) => {
  const { id } = req.user;
  const { notificationId } = req.params;
  try {
    const foundUser = await User.findOne({ _id: id }, "notifications");
    foundUser.notifications = foundUser.notifications.filter(
      ({ _id }) => _id.toLocaleString() !== notificationId.toLocaleString()
    );
    await foundUser.save();
    return res.status(200).json({ message: "notification removed" });
  } catch (error) {
    next(error);
  }
};

module.exports = notificationService;
