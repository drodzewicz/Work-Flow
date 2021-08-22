const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const MembersController = require("../controllers/http/MembersController");
const boardMiddleware = require("../middleware/boardMiddleware");
const MembersRepository = require("../repositories/MembersRepository");

const { isBoardAdmin, isBoardMember } = boardMiddleware({ MembersRepository });

const authJWT = passport.authenticate("jwt", { session: false });

router.route("/")
  .get(authJWT, isBoardMember, MembersController.getBoardMembers)
  .patch(authJWT, isBoardAdmin, MembersController.addUserToBoard);

router.route("/:userId")
  .patch(authJWT, isBoardAdmin, MembersController.changeUserRole)
  .get(authJWT, isBoardMember, MembersController.getBoardMember)
  .delete(authJWT, isBoardAdmin, MembersController.removeUserFromBoard);


module.exports = router;
