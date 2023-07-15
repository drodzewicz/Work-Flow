import { NotFoundError } from "routing-controllers";
import { Service, Inject } from "typedi";
import { MemberRepository } from "../repositories/index.js";
import { IUser } from "../types/database/index.js";
import { Pagination } from "../types/utils.type.js";
import { MemberDTO } from "../types/dto/index.js";
import { MemberMapper } from "../mappers/index.js";
import { RoleNames } from "../config/permissions.config.js";

@Service()
export class MemberService {
  memberRepository: MemberRepository;

  constructor(@Inject() memberRepository: MemberRepository) {
    this.memberRepository = memberRepository;
  }

  async getBoardMembers(boardId: string): Promise<MemberDTO[]> {
    const members = await this.memberRepository.getBoardMembers(boardId);
    return members.map(MemberMapper);
  }

  async getBoardMember(boardId: string, userId: string): Promise<MemberDTO> {
    const member = await this.memberRepository.getBoardMember(boardId, userId);
    if (!member) {
      throw new NotFoundError("User is a not a member of the board");
    }
    return MemberMapper(member);
  }

  async addUserToBoard(boardId: string, userId: string): Promise<MemberDTO> {
    const member = await this.memberRepository.addUserToBoard(boardId, userId);
    return MemberMapper(member);
  }

  async removeUserFromBoard(boardId: string, userId: string): Promise<void> {
    await this.memberRepository.removeUserFromBoard(boardId, userId);
  }

  async updateBoardMemberRole(boardId: string, userId: string, role: RoleNames): Promise<MemberDTO> {
    const member = await this.memberRepository.updateBoardMemberRole(boardId, userId, role);
    return MemberMapper(member);
  }
}
