const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
    changeUserRole,
    getBoardMembers,
    getBoardMember,
    addNewUser,
    removeUserFromBoard,
} = require("../service/http/members");

const { isBoardMember, isBoardAdmin } = require("../middleware/boardMiddleware")

const authJWT = passport.authenticate("jwt", { session: false });


router.route("/:boardId/members")
    .get(authJWT, isBoardMember, getBoardMembers)
    .patch(authJWT, isBoardAdmin, addNewUser)

router.route("/:boardId/members/:userId")
    .patch(authJWT, isBoardAdmin, changeUserRole)
    .get(authJWT, isBoardMember, getBoardMember)
    .delete(authJWT, isBoardAdmin, removeUserFromBoard);


module.exports = router;
