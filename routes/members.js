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

const authJWT = passport.authenticate("jwt", { session: false });


router.route("/:boardId/members")
    .get(authJWT, getBoardMembers)
    .patch(authJWT, addNewUser)

router.route("/:boardId/members/:userId")
    .patch(authJWT, changeUserRole)
    .get(authJWT, getBoardMember)
    .delete(authJWT,removeUserFromBoard);


module.exports = router;
