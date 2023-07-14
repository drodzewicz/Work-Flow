import { Param, Get, Put, Post, Controller, QueryParams, UseBefore, Delete, Body } from "routing-controllers";
import { BoardService, TagService } from "../services/index.js";
import { Container } from "typedi";
import { JWTMiddleware } from "../middleware/auth.middleware.js";
import { CreateTagPayload, UpdateTagPayload } from "../types/request/tag.type.js";

@Controller("/tags")
@UseBefore(JWTMiddleware)
export class TagController {
  tagService: TagService;
  boardService: BoardService;

  constructor() {
    this.tagService = Container.get(TagService);
    this.boardService = Container.get(BoardService);
  }

  @Post("/")
  async createTag(@Body() payload: CreateTagPayload) {
    const { boardId, ...otherData } = payload;
    const board = await this.boardService.getBoard(boardId);
    return this.tagService.createTag(board._id, otherData);
  }

  @Get("/")
  getBoardTags(@QueryParams() query: { boardId: string }) {
    return this.tagService.getBoardTags(query.boardId);
  }

  @Delete("/:tagId")
  async deleteTag(@Param("tagId") tagId: string) {
    await this.tagService.deleteTag(tagId);
    return { message: "Tag was successfully deleted" };
  }

  @Put("/:tagId")
  async updateTag(@Param("tagId") tagId: string, @Body() payload: UpdateTagPayload) {
    return this.tagService.updateTag(tagId, payload);
  }
}
