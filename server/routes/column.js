const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");

const {
    getBoardColumns,
    editColumnName,

} = require("../service/http/column");

const { isBoardMember, isBoardAdmin } = require("../middleware/boardMiddleware")

const authJWT = passport.authenticate("jwt", { session: false });


router.route("/")
    .get(authJWT, isBoardMember, getBoardColumns)

router.route("/:columnId")
    .patch(authJWT, isBoardAdmin, editColumnName)


module.exports = router;
