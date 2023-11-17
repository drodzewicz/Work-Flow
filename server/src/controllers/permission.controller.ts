import { Get, Controller, UseBefore, Authorized, Param } from "routing-controllers";
import { MemberService, PermissionService } from "../services/index.js";
import { Container } from "typedi";
import { JWTMiddleware } from "../middleware/auth.middleware.js";

@Controller()
@UseBefore(JWTMiddleware)
export class PermissionController {
  permissionService: PermissionService;
  memberService: MemberService;

  constructor() {
    this.permissionService = Container.get(PermissionService);
    this.memberService = Container.get(MemberService);
  }

  @Get("/permissions")
  getBoardPermissions() {
    return this.permissionService.getBoardPermissions();
  }

  @Get("/boards/:boardId/permissions/:userId")
  @Authorized()
  async getBoardUserPermissions(@Param("boardId") boardId: string, @Param("userId") userId: string) {
    const member = await this.memberService.getBoardMember(boardId, userId);
    const rolePermissions = await this.permissionService.getBoardRoles();
    return { role: member.role, ...rolePermissions[member.role] };
  }

  @Get("/boards/:boardId/roles")
  @Authorized()
  getBoardRolePermissions() {
    return this.permissionService.getBoardRoles();
  }
}
