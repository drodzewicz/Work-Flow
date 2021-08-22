const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const TagContorller = require("../controllers/http/TagContorller");
const MembersRepository = require("../repositories/MembersRepository");

const { isBoardMember, isBoardAdmin } = boardMiddleware({ MembersRepository });

const authJWT = passport.authenticate("jwt", { session: false });

router.route("/")
  .get(authJWT, isBoardMember, TagContorller.getBoardTags)
  .post(authJWT, isBoardAdmin, TagContorller.createNewBoardTag);

router.route("/:tagId")
  .delete(authJWT, isBoardAdmin, TagContorller.deleteBoardTag)
  .post(authJWT, isBoardAdmin, TagContorller.updateTag);

module.exports = router;
