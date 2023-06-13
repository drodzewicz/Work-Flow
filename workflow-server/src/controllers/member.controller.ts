import { Param, Get, Put, Controller, QueryParams, NotFoundError, UseBefore } from "routing-controllers";
import { UserService, BoardService } from "../services/index.js";
import { Container } from "typedi";
import { UserListQueryParams } from "../types/queryParams/user.type.js";
import { Pagination } from "../types/utils.type.js";
import { JWTMiddleware } from "../middleware/auth.middleware.js";
import { getPaginationSettings } from "../utils/pagination.utils.js";

@Controller("/members")
@UseBefore(JWTMiddleware)
export class MemberController {
  userService: UserService;
  boardService: BoardService;

  constructor() {
    this.userService = Container.get(UserService);
    this.boardService = Container.get(BoardService);
  }

  @Get("/")
  getUser(@QueryParams() query: UserListQueryParams) {
  
  }

 
}
