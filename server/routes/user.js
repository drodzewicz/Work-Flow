const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserController = require("../controllers/http/UserController");

const authJWT = passport.authenticate("jwt", { session: false });

router.route("/change_password")
    .patch(authJWT, UserController.changePassword);

router.route("/change_avatar")
    .patch(authJWT, UserController.changeAvatarImage);

router.route("/update_credentials")
    .post(authJWT, UserController.updateCredentials);

router.route("/find_user")
    .get(authJWT, UserController.searchUserByRegex);

module.exports = router;
