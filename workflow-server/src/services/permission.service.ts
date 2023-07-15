import { UserRepository, MemberRepository } from "../repositories/index.js";
import { Service, Inject } from "typedi";
import { PermissionsDTO, RolesDTO } from "../types/dto/index.js";
import { roles, permissions } from "../config/permissions.config.js";

@Service()
export class PermissionService {
  userRepository: UserRepository;
  memberRepository: MemberRepository;

  constructor(@Inject() userRepository: UserRepository, @Inject() memberRepository: MemberRepository) {
    this.userRepository = userRepository;
    this.memberRepository = memberRepository;
  }

  async getBoardPermissions(): Promise<PermissionsDTO> {
    return permissions;
  }

  async getBoardRoles(): Promise<RolesDTO> {
    return roles;
  }
}
