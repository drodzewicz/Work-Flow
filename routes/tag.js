const express = require("express");
const router = express.Router({mergeParams: true});
const passport = require("passport");

const {
    createNewTag,
    deleteTag,
    getBoardTags,
    updateTag
} = require("../service/http/tag");

const authJWT = passport.authenticate("jwt", { session: false });

router.route("/")
    .get(authJWT, getBoardTags)
    .post(authJWT, createNewTag)


router.route("/:tagId")
    .delete(authJWT, deleteTag)
    .post(authJWT, updateTag)


module.exports = router;
