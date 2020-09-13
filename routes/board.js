const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
	createNewBoard,
	getMyBoards,
	getMyPinnedBoards,
	getBoardById,
	updateBoard,
	togglePinBoard,
    deleteBoard,
    leaveBoard
} = require("../service/board");

const authJWT = passport.authenticate("jwt", { session: false });

router.route("/")
    .post(authJWT, createNewBoard);

router.route("/user/my_boards")
    .get(authJWT, getMyBoards)

router.route("/user/pined_boards")
    .get(authJWT, getMyPinnedBoards)
    .patch(authJWT, togglePinBoard);

router.route("/:id")
    .get(authJWT, getBoardById)
    .post(authJWT, updateBoard)
    .delete(authJWT, deleteBoard);

router.route("/:id/leave_board")
    .delete(authJWT, leaveBoard);


module.exports = router;
