const express = require("express");
const router = express.Router();
const passport = require("passport");

const { registerUser, loginJWT, isAuthenticated } = require("../service/http/user");

require("../configs/passport-jwt")(passport);
const authJWT = passport.authenticate("jwt", { session: false });

router.route("/register").post(registerUser);

router.route("/login").post(loginJWT);

router.route("/isAuth")
	.get(authJWT, isAuthenticated);

module.exports = router;
