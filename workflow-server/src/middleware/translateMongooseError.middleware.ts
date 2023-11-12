import { Middleware, ExpressErrorMiddlewareInterface, HttpError, NotFoundError } from "routing-controllers";
import { Response, Request, NextFunction } from "express";
import { InvalidMongooseIdError } from "../errors/InvalidMongooseIdError.js";

@Middleware({ type: "after" })
export class MongooseIdExceptionTranslate implements ExpressErrorMiddlewareInterface {
  error(error: HttpError, _request: Request, _response: Response, next: NextFunction) {
    let errorInstance = error;
    if (errorInstance instanceof InvalidMongooseIdError) {
      errorInstance = new NotFoundError(`${errorInstance.modelName} does not exist`);
    }

    next(errorInstance);
  }
}
