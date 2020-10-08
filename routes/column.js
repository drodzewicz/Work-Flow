const express = require("express");
const router = express.Router({mergeParams: true});
const passport = require("passport");

const {
    getBoardColumns,
    editColumnName,

} = require("../service/http/column");

const authJWT = passport.authenticate("jwt", { session: false });


router.route("/")
    .get(authJWT, getBoardColumns)

router.route("/:columnId")
    .patch(authJWT, editColumnName)


module.exports = router;
