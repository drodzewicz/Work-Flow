const express = require("express");
const router = express.Router({mergeParams: true});
const passport = require("passport");

const {
    createTask,
    getTaskbyId,
    deleteTask,
    updateTask,
    moveTask
} = require("../service/task");

const authJWT = passport.authenticate("jwt", { session: false });


router.route("/")
    .post(authJWT, createTask)
    .patch(authJWT, moveTask)

router.route("/:taskId")
    .get(authJWT, getTaskbyId)
    .delete(authJWT, deleteTask)
    .post(authJWT,updateTask)


module.exports = router;
