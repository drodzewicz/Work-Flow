const express = require("express");
const router = express.Router();
const passport = require("passport");

const { changePassword, changeAvatarImage, updateCredentials } = require("../service/user");

require("../configs/passport-jwt")(passport);
const authJWT = passport.authenticate("jwt", { session: false });

router.route("/change_password")
    .patch(authJWT, changePassword);

router.route("/change_avatar")
    .patch(authJWT, changeAvatarImage);

router.route("/update_credentials")
    .post(authJWT, updateCredentials);

module.exports = router;
