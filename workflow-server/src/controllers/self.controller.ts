import { Param, Get, Put, Controller, QueryParams, UseBefore, Body, CurrentUser } from "routing-controllers";
import { UserService, BoardService } from "../services/index.js";
import { Container } from "typedi";
import { Pagination, AuthUser } from "../types/utils.type.js";
import { UpdateUserPayload } from "../types/request/user.type.js";
import { JWTMiddleware } from "../middleware/auth.middleware.js";
import { getPaginationSettings } from "../utils/pagination.utils.js";
import { fieldErrorsHandler } from "../utils/payloadValidation.utils.js";
import { updateUserPayloadValidator } from "../validators/user.validator.js";

@Controller("/self")
@UseBefore(JWTMiddleware)
export class SelfController {
  userService: UserService;
  boardService: BoardService;

  constructor() {
    this.userService = Container.get(UserService);
    this.boardService = Container.get(BoardService);
  }

  @Get("/")
  getCurrentUser(@CurrentUser() user: AuthUser) {
    return this.userService.getUser(user.id.toString());
  }

  @Put("/")
  updatehUser(@CurrentUser() user: AuthUser, @Body() payload: UpdateUserPayload) {
    fieldErrorsHandler(updateUserPayloadValidator(payload));

    return this.userService.updateUser(user.id.toString(), payload);
  }

  @Get("/boards")
  async userBoards(@CurrentUser() user: AuthUser, @QueryParams() query: Pagination) {
    const options = getPaginationSettings(query);
    return this.boardService.getUserBoards(user.id.toString(), options);
  }

  @Get("/pinnedBoards")
  async pinnedUserBoards(@CurrentUser() user: AuthUser) {
    return this.userService.getUserPinnedBoards(user.id.toString());
  }

  @Put("/pinnedBoards/:boardId")
  async togglePinBoard(@CurrentUser() user: AuthUser, @Param("boardId") boardId: string) {
    const isPinned = await this.userService.togglePinBoard(user.id.toString(), boardId);

    return { message: `Board was successfully ${isPinned ? "pinned" : "unpinned"}` };
  }
}
