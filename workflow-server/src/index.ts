import { env } from "./config/env.config.js";
import express, { Application } from "express";
import cookieParser from "cookie-parser";
import { logger } from "./config/logger.config.js";
import chalk from "chalk";
import "reflect-metadata";
import { databaseConnect } from "./config/mongoose.config.js";
import { usePassportJWT } from "./config/passport-jwt.config.js";
import { useExpressServer } from "routing-controllers";
import { UserController } from "./controllers/user.controller.js";
import { BoardController } from "./controllers/board.controller.js";
import { AuthController } from "./controllers/auth.controller.js";
import { HttpErrorHandler } from "./middleware/httpError.middleware.js";
import { currentUserChecker } from "./middleware/auth.middleware.js";

const app: Application = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(logger);

useExpressServer(app, {
  routePrefix: env.app.routePrefix,
  classTransformer: false,
  defaultErrorHandler: false,
  controllers: [AuthController, UserController, BoardController],
  middlewares: [HttpErrorHandler],
  currentUserChecker,
});

databaseConnect();
usePassportJWT();

try {
  app.listen(env.app.port, (): void => {
    const serverLink = `http://localhost:${env.app.port}`;
    console.log(chalk.green(`Connected successfully - server is running on ${chalk.bold(serverLink)}`));
    console.log(chalk.cyan(`API is running on ${chalk.bold(`${serverLink}/${env.app.routePrefix}`)}`));
  });
} catch (error: any) {
  console.error(chalk.red(`Error occurred: ${error.message}`));
}
