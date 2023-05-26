import { Param, Get, Controller, QueryParams, NotFoundError, UseBefore, CurrentUser } from "routing-controllers";
import { UserService } from "../services/user.service.js";
import { Container } from "typedi";
import { UserListQueryParams } from "../types/queryParams.type.js";
import { JWTMiddleware } from "../middleware/auth.middleware.js";

@Controller()
export class UserController {
  userService: UserService;

  constructor() {
    this.userService = Container.get(UserService);
  }

  @Get("/users")
  @UseBefore(JWTMiddleware)
  getUser(@QueryParams() query: UserListQueryParams, @CurrentUser() user?: any) {
    const { limit, page } = query;
    console.log("My user", user)
    if (query.username) {
      return this.userService.getUsersByMatchUsername(query.username, { limit, page });
    } else {
      return this.userService.getAllUsers({ limit, page });
    }
  }

  @Get("/users/:id")
  async searchUser(@Param("id") id: string) {
    const user = await this.userService.getUser(id);
    if (!user) {
      throw new NotFoundError("User was not found.");
    }
    return user;
  }
}
