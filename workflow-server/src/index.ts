import { env } from "./config/env.config.js";
import express, { Application } from "express";
import { useExpressServer } from "routing-controllers";
import cookieParser from "cookie-parser";
import chalk from "chalk";
import "reflect-metadata";
import { logger } from "./config/logger.config.js";
import { databaseConnect } from "./config/mongoose.config.js";
import { usePassportJWT } from "./config/passport-jwt.config.js";
import { useSwagger } from "./config/swagger.config.js";
import { controllers } from "./controllers/index.js";
import { HttpErrorHandler } from "./middleware/httpError.middleware.js";
import { MongooseIdExceptionTranslate } from "./middleware/translateMongooseError.middleware.js";
import { currentUserChecker, authorizationChecker } from "./middleware/auth.middleware.js";

const app: Application = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(logger);

const routingControllersOptions = {
  cors: { credentials: true, origin: "http://localhost:5173" },
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

try {
  app.listen(env.app.port, (): void => {
    const serverLink = `http://localhost:${env.app.port}`;
    console.log(chalk.green(`Connected successfully - server is running on ${chalk.bold(serverLink)}`));
    console.log(chalk.cyan(`API is running on ${chalk.bold(`${serverLink}/${env.app.routePrefix}`)}`));
  });
} catch (error: any) {
  console.error(chalk.red(`Error occurred: ${error.message}`));
}
