import { env } from "../config/env.config.js";

import { UserController } from "./user.controller.js";
import { BoardController } from "./board.controller.js";
import { AuthController } from "./auth.controller.js";
import { TaskController } from "./task.controller.js";
import { TagController } from "./tag.controller.js";
import { MemberController } from "./member.controller.js";
import { ColumnController } from "./column.controller.js";
import { PermissionController } from "./permission.controller.js";
import { SelfController } from "./self.controller.js";
import { SeedController } from "./seed.controller.js";

export {
  UserController,
  BoardController,
  AuthController,
  TaskController,
  TagController,
  MemberController,
  ColumnController,
  PermissionController,
  SelfController,
  SeedController,
};

const controllers: any[] = [
  UserController,
  BoardController,
  AuthController,
  TaskController,
  TagController,
  MemberController,
  ColumnController,
  PermissionController,
  SelfController,
];

if (env.db.seed) {
  controllers.push(SeedController);
}

export { controllers };
