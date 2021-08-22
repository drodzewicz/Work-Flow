// HTTP REQUESTS
const authRoutes = require("./auth");
const userRoutes = require("./user");
const boardRoutes = require("./board");
const tagRoutes = require("./tag");
const taskRoutes = require("./task");
const columnRoutes = require("./column");
const membersRoute = require("./members");
const notificationRoute = require("./notifications");

const passport = require("passport");

module.exports = (app) => {
  require("../configs/passport-jwt")(passport);
  app
    .use("/api", authRoutes)
    .use("/api/user", userRoutes)
    .use("/api/notification", notificationRoute)
    .use("/api/board", boardRoutes)
    .use("/api/board/:boardId/members", membersRoute)
    .use("/api/board/:boardId/tag", tagRoutes)
    .use("/api/board/:boardId/column", columnRoutes)
    .use("/api/board/:boardId/task", taskRoutes);
  
};


