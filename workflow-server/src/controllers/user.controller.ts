import { Param, Get, Put, Controller, QueryParams, UseBefore, Body } from "routing-controllers";
import { UserService, BoardService } from "../services/index.js";
import { Container } from "typedi";
import { UserListQueryParams } from "../types/queryParams/user.type.js";
import { Pagination } from "../types/utils.type.js";
import { UpdateUserPayload } from "../types/request/user.type.js";
import { JWTMiddleware } from "../middleware/auth.middleware.js";
import { getPaginationSettings } from "../utils/pagination.utils.js";
import { fieldErrorsHandler } from "../utils/payloadValidation.utils.js";
import { updateUserPayloadValidator } from "../validators/user.validator.js";

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

  @Get("/:id")
  async getUser(@Param("id") id: string) {
    return await this.userService.getUser(id);
  }

  @Put("/:id")
  async updatehUser(@Param("id") id: string, @Body() payload: UpdateUserPayload) {
    fieldErrorsHandler(updateUserPayloadValidator(payload));

    return await this.userService.updateUser(id, payload);
  }

  @Get("/:id/boards")
  async userBoards(@Param("id") id: string, @QueryParams() query: Pagination) {
    const options = getPaginationSettings(query);
    return this.boardService.getUserBoards(id, options);
  }

  @Get("/:id/pinnedBoards")
  async pinnedUserBoards(@Param("id") id: string) {
    return this.userService.getUserPinnedBoards(id);
  }

  @Put("/:userId/pinnedBoards/:boardId")
  async togglePinBoard(@Param("userId") userId: string, @Param("boardId") boardId: string) {
    const isPinned = await this.userService.togglePinBoard(userId, boardId);

    return { message: `Board was successfully ${isPinned ? "pinned" : "unpinned"}` };
  }
}
