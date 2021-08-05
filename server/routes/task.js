const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const TaskController = require("../controllers/http/TaskController");

const authJWT = passport.authenticate("jwt", { session: false });

router
  .route("/:taskId")
  .get(authJWT, TaskController.getTask)
  .post(authJWT, TaskController.updateTask);


module.exports = router;
