import { UserRepository } from "../repositories/user.repository.js";
import { Service, Inject } from "typedi";
import { User as UserType } from "../types/index.js";
import { Pagination } from "../types/utils.type.js";
import { getPaginationSettings } from "../utils/pagination.utils.js";
import { UserMapper } from "../mappers/user.mapper.js";
import { UserDTO } from "../types/dto/user.dto.js";

@Service()
export class UserService {
  userRepository: UserRepository;

  constructor(@Inject() userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUser(userId: string): Promise<UserDTO> {
    const user = await this.userRepository.getById(userId);
    return UserMapper(user);
  }

  async getAllUsers(options: Pagination): Promise<{ totalCount: number; users: UserDTO[] }> {
    const result = await this.userRepository.getAllUser({ ...getPaginationSettings(options) });
    return {
      ...result,
      users: result.users.map(UserMapper),
    };
  }

  async getUsersByMatchUsername(
    username: string,
    options: Pagination,
  ): Promise<{ totalCount: number; users: UserDTO[] }> {
    const result = await this.userRepository.getUsersByMatchUsername(username, getPaginationSettings(options));
    return {
      ...result,
      users: result.users.map(UserMapper),
    };
  }

  async updateUserInfo(userId: string, userData: UserType): Promise<UserDTO> {
    const user = await this.userRepository.updateUser(userId, userData);
    return UserMapper(user);
  }
}
