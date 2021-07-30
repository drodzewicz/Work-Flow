const express = require("express");
const router = express.Router();
const passport = require("passport");

const UserController = require("../controllers/http/UserController");


require("../configs/passport-jwt")(passport);
const authJWT = passport.authenticate("jwt", { session: false });

router.route("/register").post(UserController.registerUser);

router.route("/login").post(UserController.loginJWT);

router.route("/isAuth").get(authJWT, UserController.getUser);

module.exports = router;
