import {
  Param,
  Get,
  Patch,
  Post,
  Delete,
  Controller,
  Body,
  UseBefore,
  HttpError,
  Authorized,
} from "routing-controllers";
import { Container } from "typedi";
import { MemberService, BoardService, UserService, PermissionService } from "../services/index.js";
import { JWTMiddleware } from "../middleware/auth.middleware.js";
import { UpdateMemberRolePayload } from "../types/request/member.type.js";
import { fieldErrorsHandler } from "../utils/payloadValidation.utils.js";
import { memberRolePayloadValidator } from "../validators/member.validator.js";
import { Permissions } from "../config/permissions.config.js";

@Controller("/boards/:boardId/members")
@UseBefore(JWTMiddleware)
export class MemberController {
  memberService: MemberService;
  boardService: BoardService;
  userService: UserService;
  permissionService: PermissionService;

  constructor() {
    this.memberService = Container.get(MemberService);
    this.boardService = Container.get(BoardService);
    this.userService = Container.get(UserService);
    this.permissionService = Container.get(PermissionService);
  }

  @Get("/")
  @Authorized()
  async getBoardMembers(@Param("boardId") boardId: string) {
    await this.boardService.getBoard(boardId);
    return this.memberService.getBoardMembers(boardId);
  }

  @Get("/:userId")
  @Authorized()
  async getBoardMember(@Param("boardId") boardId: string, @Param("userId") userId: string) {
    await this.boardService.getBoard(boardId);
    await this.userService.getUser(userId);
    return this.memberService.getBoardMember(boardId, userId);
  }

  @Post("/:userId")
  @Authorized(Permissions.MEMBER_ADD)
  async addUserToBoard(@Param("boardId") boardId: string, @Param("userId") userId: string) {
    await this.boardService.getBoard(boardId);
    await this.userService.getUser(userId);

    const isBoardMember = await this.memberService.isUserBoardMember(boardId, userId);

    if (isBoardMember) {
      throw new HttpError(400, "User is already a member of the board");
    } else {
      await this.memberService.addUserToBoard(boardId, userId);
    }

    return { message: "User added to the board" };
  }

  @Delete("/:userId")
  @Authorized(Permissions.MEMBER_REMOVE)
  async RemoveUserToBoard(@Param("boardId") boardId: string, @Param("userId") userId: string) {
    await this.boardService.getBoard(boardId);
    await this.userService.getUser(userId);
    await this.memberService.getBoardMember(boardId, userId);

    await this.memberService.removeUserFromBoard(boardId, userId);
    return { message: "User removed from the board" };
  }

  @Patch("/:userId/role")
  @Authorized(Permissions.ROLE_MODIFY)
  async updateBoardMemberRole(
    @Param("boardId") boardId: string,
    @Param("userId") userId: string,
    @Body() payload: UpdateMemberRolePayload,
  ) {
    await this.boardService.getBoard(boardId);
    await this.userService.getUser(userId);

    fieldErrorsHandler(memberRolePayloadValidator(payload));
    const { role } = payload;
    return this.memberService.updateBoardMemberRole(boardId, userId, role);
  }
}
