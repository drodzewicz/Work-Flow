import { Middleware, ExpressErrorMiddlewareInterface, HttpError } from "routing-controllers";
import { Response, Request, NextFunction } from "express";
import mongoose from "mongoose";
import { CustomMongooseValidationError } from "../errors/CustomMongooseValidationError.js";

interface HttpErrorWithMessageList extends HttpError {
  messages?: Record<string, string>;
}

@Middleware({ type: "after" })
export class HttpErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: HttpErrorWithMessageList, _request: Request, response: Response, next: NextFunction) {
    // handle Mongoose validation error
    let errorInstance = error;
    if (error instanceof mongoose.Error.ValidationError) {
      errorInstance = new CustomMongooseValidationError(error);
    }

    
    response.status(error.httpCode || 500).json({
      error: errorInstance.name,
      message: errorInstance.message,
      messages: errorInstance?.messages,
    });

    next(errorInstance);
  }
}
