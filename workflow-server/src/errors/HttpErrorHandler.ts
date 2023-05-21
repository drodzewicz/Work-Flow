import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from "routing-controllers";
import { Response, Request, NextFunction } from "express";

@Middleware({ type: "after" })
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: HttpError, request: Request, response: Response, next: NextFunction) {
    response.status(error.httpCode || 500).json({
      error: error.name,
      message: error.message,
      stack: error.stack,
    });

    next(error);
  }
}
