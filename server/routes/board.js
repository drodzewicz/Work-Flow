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
    leaveBoard,
} = require("../service/http/board");

const { isBoardAuthor, isBoardMember } = require("../middleware/boardMiddleware")

const authJWT = passport.authenticate("jwt", { session: false });

router.route("/")
    .post(authJWT, createNewBoard);

router.route("/user/my_boards")
    .get(authJWT, getMyBoards)

router.route("/user/pined_boards")
    .get(authJWT, getMyPinnedBoards)
    .patch(authJWT, togglePinBoard);

router.route("/:boardId")
    .get(authJWT, isBoardMember, getBoardById)
    .post(authJWT, isBoardAuthor, updateBoard)
    .delete(authJWT, isBoardAuthor, deleteBoard);

router.route("/:boardId/leave_board")
    .delete(authJWT, isBoardMember, leaveBoard);

module.exports = router;
