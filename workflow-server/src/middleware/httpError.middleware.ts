import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from "routing-controllers";
import { Response, Request, NextFunction } from "express";

interface HttpErrorWithMessageList extends HttpError {
  messages?: unknown[];
}

@Middleware({ type: "after" })
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: HttpErrorWithMessageList, request: Request, response: Response, next: NextFunction) {
    response.status(error.httpCode || 500).json({
      error: error.name,
      message: error.message,
      messages: error?.messages,
    });

    next(error);
  }
}
