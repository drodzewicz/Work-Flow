import {
  Param,
  Get,
  Body,
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
import { JWTMiddleware } from "../middleware/auth.middleware.js";

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
  async createColumn(@Param("boardId") boardId: string, @Body() columnData: { name: string }) {
    await this.boardService.createColumn(boardId, columnData.name);
    return this.boardService.getBoard(boardId);
  }

  @Put("/:columnId")
  async updateColumn(
    @Param("boardId") boardId: string,
    @Param("columnId") columnId: string,
    @Body() columnData: { name: string },
  ) {
    await this.boardService.updateColumn(boardId, columnId, columnData.name);
    return this.boardService.getBoard(boardId);
  }

  @Patch("/:columnId")
  async moveColumn(
    @Param("boardId") boardId: string,
    @Param("columnId") columnId: string,
    @Body() columnData: { index: number },
  ) {
    await this.boardService.updateColumnOrder(boardId, columnId, columnData.index);
    return this.boardService.getBoard(boardId);
  }

  @Delete("/:columnId")
  async deleteColumn(@Param("boardId") boardId: string, @Param("columnId") columnId: string) {
    await this.boardService.deleteColumn(boardId, columnId);
    return this.boardService.getBoard(boardId);
  }
}
