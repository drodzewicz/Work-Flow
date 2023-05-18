import { env } from "./config/env.js";
import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: "Hello World!",
  });
});

try {
  app.listen(env.app.port, (): void => {
    console.log(`Connected successfully on port ${env.app.port}`);
  });
} catch (error: any) {
  console.error(`Error occurred: ${error.message}`);
}
