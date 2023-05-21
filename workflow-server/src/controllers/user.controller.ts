import { Param, Get, Controller, QueryParam, NotFoundError } from "routing-controllers";
import { UserService } from "../services/user.service.js";
import { Container } from "typedi";

@Controller()
export class UserController {
  userService: UserService;

  constructor() {
    this.userService = Container.get(UserService);
  }

  @Get("/users")
  getUser(@QueryParam("username") username: string) {
    return this.userService.getUsersByMatchUsername(username);
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
