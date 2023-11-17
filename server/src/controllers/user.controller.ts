import { Param, Get, Put, Controller, QueryParams, UseBefore, Body } from "routing-controllers";
import { UserService, BoardService } from "../services/index.js";
import { Container } from "typedi";
import { UserListQueryParams } from "../types/queryParams/user.type.js";
import { Pagination } from "../types/utils.type.js";
import { JWTMiddleware } from "../middleware/auth.middleware.js";
import { getPaginationSettings } from "../utils/pagination.utils.js";

@Controller("/users")
@UseBefore(JWTMiddleware)
export class UserController {
  userService: UserService;
  boardService: BoardService;

  constructor() {
    this.userService = Container.get(UserService);
    this.boardService = Container.get(BoardService);
  }

  @Get("/")
  getUsers(@QueryParams() query: UserListQueryParams) {
    const options = getPaginationSettings(query);
    if (query.username) {
      return this.userService.getUsersByMatchUsername(query.username, options);
    } else {
      return this.userService.getAllUsers(options);
    }
  }

  @Get("/:userId")
  getUser(@Param("userId") userId: string) {
    return this.userService.getUser(userId);
  }

  @Get("/:userId/boards")
  async userBoards(@Param("userId") userId: string, @QueryParams() query: Pagination) {
    const options = getPaginationSettings(query);
    return this.boardService.getUserBoards(userId, options);
  }
}
