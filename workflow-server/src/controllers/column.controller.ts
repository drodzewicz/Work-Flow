import {
  Param,
  Get,
  Put,
  Post,
  Controller,
  QueryParams,
  NotFoundError,
  UseBefore,
  Delete,
  Patch,
} from "routing-controllers";
import { UserService, BoardService } from "../services/index.js";
import { Container } from "typedi";
import { UserListQueryParams } from "../types/queryParams/user.type.js";
import { Pagination } from "../types/utils.type.js";
import { JWTMiddleware } from "../middleware/auth.middleware.js";
import { getPaginationSettings } from "../utils/pagination.utils.js";

@Controller("/boards/:boardId/columns")
@UseBefore(JWTMiddleware)
export class ColumnController {
  userService: UserService;
  boardService: BoardService;

  constructor() {
    this.userService = Container.get(UserService);
    this.boardService = Container.get(BoardService);
  }

  @Post("/")
  async createColumn(@Param("boardId") boardId: string) {
    // TODO: add create column
  }

  @Put("/:columnId")
  async updateColumn(@Param("boardId") boardId: string, @Param("columnId") columnId: string) {
    // TODO: add update board
  }

  @Patch("/:columnId")
  async moveColumn(@Param("boardId") boardId: string, @Param("columnId") columnId: string) {
    // TODO: (sordOrder and name)
  }

  @Delete("/:columnId")
  async deleteColumn(@Param("boardId") boardId: string, @Param("columnId") columnId: string) {
    // TODO: add delete column (cascade delete tasks)
  }
}
