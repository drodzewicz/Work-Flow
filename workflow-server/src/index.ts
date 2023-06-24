import { env } from "./config/env.config.js";
import express, { Application } from "express";
import { useExpressServer, getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from 'routing-controllers-openapi'
import * as swaggerUiExpress from 'swagger-ui-express'
import cookieParser from "cookie-parser";
import chalk from "chalk";
import "reflect-metadata";
import { logger } from "./config/logger.config.js";
import { databaseConnect } from "./config/mongoose.config.js";
import { usePassportJWT } from "./config/passport-jwt.config.js";
import { useSwagger } from "./config/swagger.config.js";
import { UserController } from "./controllers/user.controller.js";
import { BoardController } from "./controllers/board.controller.js";
import { AuthController } from "./controllers/auth.controller.js";
import { TaskController } from "./controllers/task.controller.js";
import { TagController } from "./controllers/tag.controller.js";
import { MemberController } from "./controllers/member.controller.js";
import { ColumnController } from "./controllers/column.controller.js";

import { HttpErrorHandler } from "./middleware/httpError.middleware.js";
import { currentUserChecker } from "./middleware/auth.middleware.js";

const app: Application = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(logger);

const routingControllersOptions = {
  routePrefix: env.app.routePrefix,
  classTransformer: false,
  defaultErrorHandler: false,
  controllers: [
    AuthController,
    UserController,
    BoardController,
    ColumnController,
    TaskController,
    TagController,
    MemberController,
  ],
  middlewares: [HttpErrorHandler],
  currentUserChecker,
}

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
