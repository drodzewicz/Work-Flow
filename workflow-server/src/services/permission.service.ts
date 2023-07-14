import { UserRepository, MemberRepository } from "../repositories/index.js";
import { Service, Inject } from "typedi";
import { IUser } from "../types/database/index.js";
import { Pagination } from "../types/utils.type.js";
import { UserDTO, BoardDTO } from "../types/dto/index.js";
import { BoardMapper, UserMapper } from "../mappers/index.js";
import { roles, permissions } from "../config/permissions.config.js";

@Service()
export class PermissionService {
  userRepository: UserRepository;
  memberRepository: MemberRepository;

  constructor(@Inject() userRepository: UserRepository, @Inject() memberRepository: MemberRepository) {
    this.userRepository = userRepository;
    this.memberRepository = memberRepository;
  }

  async getBoardPermissions() {
    return permissions;
  }

  async getBoardRoles() {
    return roles;
  }
}
