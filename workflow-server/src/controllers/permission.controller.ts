import { Get, Controller, UseBefore } from "routing-controllers";
import { PermissionService } from "../services/index.js";
import { Container } from "typedi";
import { JWTMiddleware } from "../middleware/auth.middleware.js";

@Controller()
@UseBefore(JWTMiddleware)
export class PermissionController {
  permissionService: PermissionService;

  constructor() {
    this.permissionService = Container.get(PermissionService);
  }

  @Get("/boards/:boardId/permissions")
  getBoardPermissions() {
    return this.permissionService.getBoardPermissions();
  }

  @Get("/boards/:boardId/roles")
  getBoardRolePermissions() {
    return this.permissionService.getBoardRoles();
  }
}
