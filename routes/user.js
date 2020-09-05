const express = require("express");
const router = express.Router();

const { changePassword, changeAvatarImage, updateCredentials } = require("../service/user");

router.route("/chnage_password")
    .patch(changePassword);

router.route("/change_avatar")
    .patch(changeAvatarImage);

router.route("/update_credentials")
    .put(updateCredentials);

module.exports = router;
