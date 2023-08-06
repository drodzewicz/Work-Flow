import { UnauthorizedError } from "routing-controllers";
import { Service, Inject } from "typedi";
import { MemberRepository } from "../repositories/index.js";
import { MemberDTO } from "../types/dto/index.js";
import { MemberMapper } from "../mappers/index.js";
import { RoleNames } from "../config/permissions.config.js";
import { Pagination } from "src/types/utils.type.js";

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

  async getBoardMembersPaginated(
    boardId: string,
    options: Pagination,
  ): Promise<{ totalCount: number; members: MemberDTO[] }> {
    const { data, totalCount } = await this.memberRepository.getBoardMembersPaginated(boardId, options);
    return {
      totalCount,
      members: data.map(MemberMapper),
    };
  }

  async getBoardMemberByUsername(
    boardId: string,
    username: string,
    options: Pagination,
  ): Promise<{ totalCount: number; members: MemberDTO[] }> {
    const { data, totalCount } = await this.memberRepository.getBoardMembersByUsername(boardId, username, options);
    return {
      totalCount,
      members: data.map(MemberMapper),
    };
  }

  async getBoardMember(boardId: string, userId: string): Promise<MemberDTO> {
    const member = await this.memberRepository.getBoardMember(boardId, userId);
    if (!member) {
      throw new UnauthorizedError("User is not a member of the board");
    }
    return MemberMapper(member);
  }

  async isUserBoardMember(boardId: string, userId: string): Promise<boolean> {
    try {
      await this.getBoardMember(boardId, userId);
      return true;
    } catch (error) {
      return false;
    }
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
