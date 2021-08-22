const express = require("express");
const passport = require("passport");
const NotificationController = require("../controllers/http/NotificationController");

const authJWT = passport.authenticate("jwt", { session: false });
const router = express.Router({ mergeParams: true });

router.route("/")
  .get(authJWT, NotificationController.getLoggedInUserNotifications);

router
  .route("/:notificationId")
  .delete(authJWT, NotificationController.removeLoggedInUserNotification);

module.exports = router;
