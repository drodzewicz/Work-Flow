const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");

const {
    getMyNotifications,
    removeNotification
} = require("../service/http/notification");

const authJWT = passport.authenticate("jwt", { session: false });

router.route("/")
    .get(authJWT, getMyNotifications)

router.route("/:notificationId")
    .delete(authJWT, removeNotification)

module.exports = router;
