import { env } from "./config/env.config.js";
import http from "http";
import express, { Application } from "express";
import { useExpressServer } from "routing-controllers";
import cookieParser from "cookie-parser";
import "reflect-metadata";
import { logger } from "./config/logger.config.js";
import { databaseConnect } from "./config/mongoose.config.js";
import { usePassportJWT } from "./config/passport-jwt.config.js";
import { useSwagger } from "./config/swagger.config.js";
import { controllers } from "./controllers/index.js";
import { HttpErrorHandler } from "./middleware/httpError.middleware.js";
import { MongooseIdExceptionTranslate } from "./middleware/translateMongooseError.middleware.js";
import { currentUserChecker, authorizationChecker } from "./middleware/auth.middleware.js";
import { Server as WSServer } from "socket.io";

const app: Application = express();
const server = http.createServer(app);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(logger);

const routingControllersOptions = {
  cors: { credentials: true, origin: env.cors.url },
  routePrefix: env.app.routePrefix,
  classTransformer: false,
  defaultErrorHandler: false,
  controllers,
  middlewares: [MongooseIdExceptionTranslate, HttpErrorHandler],
  currentUserChecker,
  authorizationChecker,
};

useExpressServer(app, routingControllersOptions);

databaseConnect();
usePassportJWT();
useSwagger(app, routingControllersOptions);

const io = new WSServer(server, {
  cors: {
    methods: ["GET", "POST"],
    credentials: true,
  },
  allowEIO3: true,
});

io.on("connection", (socket) => {
  socket.on("board-room", (data) => {
    if (!data.roomId) {
      return;
    }
    if (data.type === "JOIN") {
      socket.join(data.roomId);
    } else if (data.type === "LEAVE") {
      socket.leave(data.roomId);
    }
  });

  socket.on("task-update", (data: { roomId: string; type: string }) => {
    if (!data.roomId) {
      return;
    }
    socket.in(data.roomId).emit("task-alert", { type: data.type });
  });

  socket.on("column-update", (data: { roomId: string; type: string }) => {
    if (!data.roomId) {
      return;
    }
    socket.in(data.roomId).emit("column-alert", { type: data.type });
  });
});

export { server };
