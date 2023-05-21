import { env } from "./config/env.config.js";
import express, { Application, Request, Response } from "express";
import "reflect-metadata";
import { databaseConnect } from "./config/mongoose.config.js";
import { createExpressServer } from "routing-controllers";
import { UserController } from "./controllers/user.controller.js";
import { HttpErrorHandler } from "./errors/HttpErrorHandler.js";

const app: Application = createExpressServer({
  routePrefix: env.app.routePrefix,
  classTransformer: false,
  defaultErrorHandler: false,
  controllers: [UserController],
  middlewares: [HttpErrorHandler],
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

databaseConnect();

try {
  app.listen(env.app.port, (): void => {
    const serverLink = `http://localhost:${env.app.port}`;
    console.log(`Connected successfully - server is running on ${serverLink}`);
    console.log(`API is running on ${serverLink}/${env.app.routePrefix}`);
  });
} catch (error: any) {
  console.error(`Error occurred: ${error.message}`);
}
