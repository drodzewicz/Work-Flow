import { env } from "./config/env.js";
import express, { Application, Request, Response } from "express";
import "reflect-metadata";
import { databaseConnect } from "./config/mongoose.conf.js";

const app: Application = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: "Hello World!",
  });
});

databaseConnect();

try {
  app.listen(env.app.port, (): void => {
    console.log(`Connected successfully - server is running on  http://localhost:${env.app.port}/`);
  });
} catch (error: any) {
  console.error(`Error occurred: ${error.message}`);
}
