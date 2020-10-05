const express = require("express");
const router = express.Router({mergeParams: true});
const passport = require("passport");

const {
    createColumn,
    deleteColumn,
    getBoardColumns,
    editColumnName,
    moveColumn
} = require("../service/http/column");

const authJWT = passport.authenticate("jwt", { session: false });


router.route("/")
    .get(authJWT, getBoardColumns)
    .post(authJWT, createColumn)
    .patch(authJWT, moveColumn)


router.route("/:columnId")
    .patch(authJWT, editColumnName)
    .delete(authJWT, deleteColumn)


module.exports = router;
