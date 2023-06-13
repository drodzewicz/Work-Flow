import {
  Param,
  Body,
  Get,
  Post,
  Delete,
  Controller,
  QueryParams,
  NotFoundError,
  UseBefore,
  CurrentUser,
  Put,
} from "routing-controllers";
import { BoardService } from "../services/index.js";
import { Container } from "typedi";
import { JWTMiddleware } from "../middleware/auth.middleware.js";
import { Pagination } from "../types/utils.type.js";
import { CreateBoardPayload } from "../types/request/board.type.js";
import { fieldErrorsHandler } from "../utils/payloadValidation.utils.js";
import { boardPayloadValidator } from "../validators/board.validator.js";
import { getPaginationSettings } from "../utils/pagination.utils.js";

@Controller("/boards")
@UseBefore(JWTMiddleware)
export class BoardController {
  boardService: BoardService;

  constructor() {
    this.boardService = Container.get(BoardService);
  }

  @Post("/")
  createBorad(@Body() board: CreateBoardPayload, @CurrentUser() user: any) {
    fieldErrorsHandler(boardPayloadValidator(board));
    return this.boardService.createBoard(board, user);
  }

  @Get("/")
  getBoards(@QueryParams() query: Pagination) {
    const options = getPaginationSettings(query);
    return this.boardService.getBoards(options);
  }

  @Get("/:boardId")
  async getBoard(@Param("boardId") boardId: string) {
    const board = await this.boardService.getBoard(boardId);
    if (!board) {
      throw new NotFoundError("Board was not found.");
    }
    return board;
  }

  @Delete("/:boardId")
  async deleteBoard(@Param("boardId") boardId: string) {
    await this.boardService.deleteBoard(boardId);

    return { message: "Board was successfully deleted" };
  }
}
