import { Response, NextFunction } from "express";
import passport from "passport";
import { ExpressMiddlewareInterface, UnauthorizedError, Action } from "routing-controllers";
import { AuthRequest } from "../types/utils.type.js";

export class JWTMiddleware implements ExpressMiddlewareInterface {
  authenticate = (callback) => passport.authenticate("jwt", { session: false }, callback);

  use(req: AuthRequest, res: Response, next: NextFunction): Promise<passport.Authenticator> {
    return this.authenticate((err, user, info) => {
      if (err || !user) {
        return next(new UnauthorizedError(info));
      }

      req.user = user;
      return next();
    })(req, res, next);
  }
}

export const currentUserChecker = async (action: Action) => {
  return action.request.user;
};
