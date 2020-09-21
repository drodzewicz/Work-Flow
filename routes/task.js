const express = require("express");
const router = express.Router({mergeParams: true});
const passport = require("passport");

const {
    createTask,
    getTaskbyId,
    getBoardTasks,
    deleteTask,
    updateTask,
} = require("../service/task");

const authJWT = passport.authenticate("jwt", { session: false });


router.route("/")
    .delete(authJWT, createTask)


module.exports = router;
