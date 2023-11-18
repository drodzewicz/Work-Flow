import { env } from "./config/env.config.js";
import * as path from "path";
import http from "http";
import express, { Application } from "express";
import { useExpressServer } from "routing-controllers";
import cookieParser from "cookie-parser";
import "reflect-metadata";
import { logger } from "./config/logger.config.js";
import { databaseConnect } from "./config/mongoose.config.js";
import { usePassportJWT } from "./config/passport-jwt.config.js";
import { useWebSockets } from "./config/ws.config.js";
import { controllers } from "./controllers/index.js";
import { HttpErrorHandler } from "./middleware/httpError.middleware.js";
import { MongooseIdExceptionTranslate } from "./middleware/translateMongooseError.middleware.js";
import { currentUserChecker, authorizationChecker } from "./middleware/auth.middleware.js";
import { sockets } from "./web-sockets/index.js";

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
useWebSockets(server, sockets);

if (env.environment === "production") {
  app.use(express.static(path.join(process.cwd(), `/dist/public/`)));
  app.get("*", (_, res) => res.sendFile(path.join(process.cwd(), `/dist/public/index.html`)));
}

export { server };
