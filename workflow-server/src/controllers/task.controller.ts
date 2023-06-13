import { Param, Get, Put, Post, Controller, QueryParams, NotFoundError, UseBefore, Delete, Patch } from "routing-controllers";
import { UserService, BoardService } from "../services/index.js";
import { Container } from "typedi";
import { UserListQueryParams } from "../types/queryParams/user.type.js";
import { Pagination } from "../types/utils.type.js";
import { JWTMiddleware } from "../middleware/auth.middleware.js";
import { getPaginationSettings } from "../utils/pagination.utils.js";

@Controller("/boards/:boardId/columns/:columnId/tasks")
@UseBefore(JWTMiddleware)
export class TaskController {
  userService: UserService;
  boardService: BoardService;

  constructor() {
    this.userService = Container.get(UserService);
    this.boardService = Container.get(BoardService);
  }

  @Post("/")
  createTask(@QueryParams() query: UserListQueryParams) {
    // TODO: create task
  }

  @Get("/")
  getColumnTasks(@Param("boardId") boardId: string, @Param("columnId") columnId: string) {
    // TODO: get column tasks with pagination
  }

  @Get("/:id")
  getTask(@QueryParams() query: UserListQueryParams) {
    // TODO: Get task
  }

  @Put("/:id")
  updateTask(@QueryParams() query: UserListQueryParams) {
    // TODO: update task
  }

  @Patch("/:id")
  moveTask(@QueryParams() query: UserListQueryParams) {
    // TODO: move task rows and columns
  }

  @Delete("/:id")
  deleteTask(@QueryParams() query: UserListQueryParams) {
    // TODO: delete task
  }
}
