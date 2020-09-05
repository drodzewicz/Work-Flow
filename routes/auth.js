const express = require("express");
const router = express.Router();
const passport = require("passport");

// const { registerUser, loginJWT } = require("../service/user");

require("../configs/passport-jwt")(passport);

router.route("/welcome").get((req, res) => {
    res.send("siema")
})

// router.route("/register")
//     .post(registerUser);

// router.route("/login")
//     .post(loginJWT);

module.exports = router;
