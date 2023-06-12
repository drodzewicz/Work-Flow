import { Param, Get, Put, Controller, QueryParams, NotFoundError, UseBefore } from "routing-controllers";
import { UserService, BoardService } from "../services/index.js";
import { Container } from "typedi";
import { UserListQueryParams } from "../types/queryParams/user.type.js";
import { Pagination } from "../types/utils.type.js";
import { JWTMiddleware } from "../middleware/auth.middleware.js";
import { getPaginationSettings } from "../utils/pagination.utils.js";

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
  getUser(@QueryParams() query: UserListQueryParams) {
    const options = getPaginationSettings(query);
    if (query.username) {
      return this.userService.getUsersByMatchUsername(query.username, options);
    } else {
      return this.userService.getAllUsers(options);
    }
  }

  @Get("/:id")
  async searchUser(@Param("id") id: string) {
    const user = await this.userService.getUser(id);
    if (!user) {
      throw new NotFoundError("User was not found.");
    }
    return user;
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
