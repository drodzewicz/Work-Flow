import { Param, Get, Put, Post, Controller, QueryParams, NotFoundError, UseBefore, Delete } from "routing-controllers";
import { UserService, BoardService } from "../services/index.js";
import { Container } from "typedi";
import { UserListQueryParams } from "../types/queryParams/user.type.js";
import { Pagination } from "../types/utils.type.js";
import { JWTMiddleware } from "../middleware/auth.middleware.js";
import { getPaginationSettings } from "../utils/pagination.utils.js";

@Controller("/boards/:id/tags")
@UseBefore(JWTMiddleware)
export class TagController {
  userService: UserService;
  boardService: BoardService;

  constructor() {
    this.userService = Container.get(UserService);
    this.boardService = Container.get(BoardService);
  }

  @Post("/")
  createTag(@QueryParams() query: UserListQueryParams) {
    // TODO: add create tag to the board
  }

  @Get("/")
  getBoardTags(@QueryParams() query: UserListQueryParams) {
    // TODO: add get all tags of the board
  }

  @Delete("/:tagId")
  deleteTag(@QueryParams() query: UserListQueryParams) {
    // TODO: add delete tag 
  }

  @Put("/:tagId")
  updateTag(@QueryParams() query: UserListQueryParams) {
    // TODO: add update tag
  }
}
