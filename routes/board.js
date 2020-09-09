const express = require("express");
const router = express.Router();
const passport = require("passport");

const { createNewBoard, getMyBoards, getBoardById, updateBoard } = require("../service/board");

const authJWT = passport.authenticate("jwt", { session: false });

router.route("/")
    .post(authJWT, createNewBoard);

router.route("/user/my_boards")
    .get(authJWT, getMyBoards)

router.route("/:id")
    .get(authJWT, getBoardById)
    .post(authJWT, updateBoard);

module.exports = router;
