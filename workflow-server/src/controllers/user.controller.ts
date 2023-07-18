import { Authorized, Param, Get, Put, Controller, QueryParams, UseBefore, Body } from "routing-controllers";
import { UserService, BoardService } from "../services/index.js";
import { Container } from "typedi";
import { UserListQueryParams } from "../types/queryParams/user.type.js";
import { Pagination } from "../types/utils.type.js";
import { UpdateUserPayload } from "../types/request/user.type.js";
import { JWTMiddleware } from "../middleware/auth.middleware.js";
import { getPaginationSettings } from "../utils/pagination.utils.js";
import { fieldErrorsHandler } from "../utils/payloadValidation.utils.js";
import { updateUserPayloadValidator } from "../validators/user.validator.js";
import { Permissions } from "../config/permissions.config.js";

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
  async getUser(@Param("userId") userId: string) {
    return await this.userService.getUser(userId);
  }

  @Put("/:userId")
  @Authorized(Permissions.USER_SELF)
  async updatehUser(@Param("userId") userId: string, @Body() payload: UpdateUserPayload) {
    fieldErrorsHandler(updateUserPayloadValidator(payload));

    return await this.userService.updateUser(userId, payload);
  }

  @Get("/:userId/boards")
  @Authorized(Permissions.USER_SELF)
  async userBoards(@Param("userId") userId: string, @QueryParams() query: Pagination) {
    const options = getPaginationSettings(query);
    return this.boardService.getUserBoards(userId, options);
  }

  @Get("/:userId/pinnedBoards")
  @Authorized(Permissions.USER_SELF)
  async pinnedUserBoards(@Param("userId") userId: string) {
    return this.userService.getUserPinnedBoards(userId);
  }

  @Put("/:userId/pinnedBoards/:boardId")
  @Authorized(Permissions.USER_SELF)
  async togglePinBoard(@Param("userId") userId: string, @Param("boardId") boardId: string) {
    const isPinned = await this.userService.togglePinBoard(userId, boardId);

    return { message: `Board was successfully ${isPinned ? "pinned" : "unpinned"}` };
  }
}
