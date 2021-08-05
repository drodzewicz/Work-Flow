const express = require("express");
const router = express.Router();
const passport = require("passport");
const BoardController = require("../controllers/http/BoardController");
const { isBoardAuthor, isBoardMember } = require("../middleware/boardMiddleware")

const authJWT = passport.authenticate("jwt", { session: false });

router.route("/")
    .post(authJWT, BoardController.createBoard);

router.route("/user/my_boards")
    .get(authJWT, BoardController.getLoggednInUserBoards);

router
  .route("/user/pined_boards")
  .get(authJWT, BoardController.getLoggednInUserPinnedBoards)
  .patch(authJWT, BoardController.togglePinBoard);

router
  .route("/:boardId")
  .get(authJWT, isBoardMember, BoardController.getBoard)
  .post(authJWT, isBoardAuthor, BoardController.updateBoard)
  .delete(authJWT, isBoardAuthor, BoardController.deleteBoard);

router.route("/:boardId/leave_board")
  .delete(authJWT, isBoardMember, BoardController.leaveBoard);

module.exports = router;
