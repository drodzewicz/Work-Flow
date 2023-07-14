import { UserRepository, MemberRepository } from "../repositories/index.js";
import { Service, Inject } from "typedi";
import { IUser } from "../types/database/index.js";
import { Pagination } from "../types/utils.type.js";
import { UserDTO, BoardDTO } from "../types/dto/index.js";
import { BoardMapper, UserMapper } from "../mappers/index.js";
import { RoleNames } from "../config/permissions.config.js";

@Service()
export class MemberService {
  userRepository: UserRepository;
  memberRepository: MemberRepository;

  constructor(@Inject() userRepository: UserRepository, @Inject() memberRepository: MemberRepository) {
    this.userRepository = userRepository;
    this.memberRepository = memberRepository;
  }

  async getBoardMembers(boardId: string) {
    return await this.memberRepository.getBoardMembers(boardId);
  }

  async getBoardMember(boardId: string, userId: string) {
    return await this.memberRepository.getBoardMember(boardId, userId);
  }

  async addUserToBoard(boardId: string, userId: string) {
    await this.memberRepository.addUserToBoard(boardId, userId);
  }

  async removeUserFromBoard(boardId: string, userId: string) {
    await this.memberRepository.removeUserFromBoard(boardId, userId);
  }

  async updateBoardMemberRole(boardId: string, userId: string, role: RoleNames) {
    return await this.memberRepository.updateBoardMemberRole(boardId, userId, role);
  }
}
