const express = require("express");
const passport = require("passport");
const ColumnContorller = require("../controllers/http/ColumnContorller");
const boardMiddleware = require("../middleware/boardMiddleware");
const MembersRepository = require("../repositories/MembersRepository");

const { isBoardMember, isBoardAdmin } = boardMiddleware({ MembersRepository });

const router = express.Router({ mergeParams: true });
const authJWT = passport.authenticate("jwt", { session: false });

router.route("/")
    .get(authJWT, isBoardMember, ColumnContorller.getBoardColumns);

router.route("/:columnId")
    .patch(authJWT, isBoardAdmin, ColumnContorller.updateColumnName);


module.exports = router;
