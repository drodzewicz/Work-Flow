import { env } from "./config/env.config.js";
import express, { Application } from "express";
import cookieParser from "cookie-parser";
import "reflect-metadata";
import { databaseConnect } from "./config/mongoose.config.js";
import { usePassportJWT } from "./config/passport-jwt.config.js";
import { createExpressServer } from "routing-controllers";
import { UserController } from "./controllers/user.controller.js";
import { AuthController } from "./controllers/auth.controller.js";
import { HttpErrorHandler } from "./middleware/httpError.middleware.js";
import { currentUserChecker } from "./middleware/auth.middleware.js";

const app: Application = createExpressServer({
  routePrefix: env.app.routePrefix,
  classTransformer: false,
  defaultErrorHandler: false,
  controllers: [UserController, AuthController],
  middlewares: [HttpErrorHandler],
  currentUserChecker,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

databaseConnect();
usePassportJWT();

try {
  app.listen(env.app.port, (): void => {
    const serverLink = `http://localhost:${env.app.port}`;
    console.log(`Connected successfully - server is running on ${serverLink}`);
    console.log(`API is running on ${serverLink}/${env.app.routePrefix}`);
  });
} catch (error: any) {
  console.error(`Error occurred: ${error.message}`);
}
