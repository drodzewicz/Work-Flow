const express = require("express");
const router = express.Router({mergeParams: true});
const passport = require("passport");

const {
    createNewTag,
    deleteTag,
    getBoardTags,
    updateTag
} = require("../service/http/tag");

const { isBoardMember, isBoardAdmin } = require("../middleware/boardMiddleware")

const authJWT = passport.authenticate("jwt", { session: false });

router.route("/")
    .get(authJWT, isBoardMember, getBoardTags)
    .post(authJWT, isBoardAdmin, createNewTag)


router.route("/:tagId")
    .delete(authJWT, isBoardAdmin, deleteTag)
    .post(authJWT, isBoardAdmin, updateTag)


module.exports = router;
