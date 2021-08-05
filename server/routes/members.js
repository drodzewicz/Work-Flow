const express = require("express");
const router = express.Router();
const passport = require("passport");
const MembersController = require("../controllers/http/MembersController");
const { isBoardMember, isBoardAdmin } = require("../middleware/boardMiddleware")

const authJWT = passport.authenticate("jwt", { session: false });

router
  .route("/:boardId/members")
  .get(authJWT, isBoardMember, MembersController.getBoardMembers)
  .patch(authJWT, isBoardAdmin, MembersController.addUserToBoard);

router
  .route("/:boardId/members/:userId")
  .patch(authJWT, isBoardAdmin, MembersController.changeUserRole)
  .get(authJWT, isBoardMember, MembersController.getBoardMember)
  .delete(authJWT, isBoardAdmin, MembersController.removeUserFromBoard);


module.exports = router;
