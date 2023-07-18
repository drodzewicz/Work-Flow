import { Response, NextFunction } from "express";
import passport from "passport";
import { ExpressMiddlewareInterface, UnauthorizedError, Action } from "routing-controllers";
import { AuthRequest } from "../types/utils.type.js";
import { roles, Permissions } from "../config/permissions.config.js";
import { MemberService, TaskService } from "../services/index.js";
import { MemberRepository, TaskRepository, UserRepository, BoardRepository } from "../repositories/index.js";
import { AuthUser } from "../types/utils.type.js";

const memberRepository = new MemberRepository();
const taskRepository = new TaskRepository();
const userRepository = new UserRepository();
const boardRepository = new BoardRepository();

const memberService = new MemberService(memberRepository);
const taskService = new TaskService(taskRepository, userRepository, boardRepository);

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

export const authorizationChecker = async (action: Action, authorizedPermissions: Permissions[]) => {
  const currentUser = action.request.user as AuthUser;
  let boardId = action.request.params?.boardId ?? action.request.body?.boardId;
  const taskId = action.request.params?.taskId;
  const userId = action.request.params?.userId;

  if (taskId) {
    boardId = await taskService.getTaskBoardId(taskId);
  }

  if (boardId) {
    const member = await memberService.getBoardMember(boardId, currentUser.id.toString());

    const { permissions } = roles[member.role];
    // current user must be a board member
    // and should have all of the roles specified on the endpoint
    const authorized = authorizedPermissions.reduce((acc, permission) => acc && permissions.includes(permission), true);
    if (!authorized) {
      return false;
    }
  }

  // Current user must be the same user are provided by userId
  if (authorizedPermissions.includes(Permissions.USER_SELF)) {
    return currentUser.id.toString() === userId;
  }
  return true;
};
