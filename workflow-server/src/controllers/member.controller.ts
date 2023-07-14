import { Param, Get, Patch, Post, Delete, Controller, Body, UseBefore } from "routing-controllers";
import { Container } from "typedi";
import { MemberService } from "../services/index.js";
import { JWTMiddleware } from "../middleware/auth.middleware.js";
import { UpdateMemberRolePayload } from "../types/request/member.type.js";

@Controller("/boards/:boardId/members")
@UseBefore(JWTMiddleware)
export class MemberController {
  memberService: MemberService;

  constructor() {
    this.memberService = Container.get(MemberService);
  }

  @Get("/")
  getBoardMembers(@Param("boardId") boardId: string) {
    return this.memberService.getBoardMembers(boardId);
  }

  @Get("/:userId")
  getBoardMember(@Param("boardId") boardId: string, @Param("userId") userId: string) {
    return this.memberService.getBoardMember(boardId, userId);
  }

  @Post("/:userId")
  async addUserToBoard(@Param("boardId") boardId: string, @Param("userId") userId: string) {
    await this.memberService.addUserToBoard(boardId, userId);
    return { message: "User added to the board" };
  }

  @Delete("/:userId")
  async RemoveUserToBoard(@Param("boardId") boardId: string, @Param("userId") userId: string) {
    await this.memberService.removeUserFromBoard(boardId, userId);
    return { message: "User removed from the board" };
  }

  @Patch("/:userId/role")
  updateBoardMemberRole(
    @Param("boardId") boardId: string,
    @Param("userId") userId: string,
    @Body() payload: UpdateMemberRolePayload,
  ) {
    const { role } = payload;
    return this.memberService.updateBoardMemberRole(boardId, userId, role);
  }
}
