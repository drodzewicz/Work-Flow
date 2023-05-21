import { Param, Get, Controller, QueryParams, NotFoundError } from "routing-controllers";
import { UserService } from "../services/user.service.js";
import { Container } from "typedi";
import { UserListQueryParams } from "../types/queryParams.type.js";

@Controller()
export class UserController {
  userService: UserService;

  constructor() {
    this.userService = Container.get(UserService);
  }

  @Get("/users")
  getUser(@QueryParams() query: UserListQueryParams) {
    const { limit, page } = query;

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
