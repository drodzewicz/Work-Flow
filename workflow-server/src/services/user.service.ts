import { UserRepository } from "../repositories/user.repository.js";
import { Service, Inject } from "typedi";
import { User as UserType } from "../types/index.js";
import { Pagination } from "../types/utils.type.js";
import { getPaginationSettings } from "../utils/pagination.utils.js";
@Service()
export class UserService {
  userRepository: UserRepository;

  constructor(@Inject() userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUser(userId: string) {
    const userFields = "_id username name surname avatarImageURL email";
    return await this.userRepository.getUserById(userId, userFields);
  }

  async getAllUsers(options: Pagination) {
    const fields = "_id username name surname avatarImageURL email";

    return await this.userRepository.getAllUser({ ...getPaginationSettings(options), fields });
  }

  async getUsersByMatchUsername(username: string, options: Pagination) {
    return await this.userRepository.getUsersByMatchUsername(username, getPaginationSettings(options));
  }

  async updateUserInfo(userId: string, userData: UserType) {
    return await this.userRepository.updateUser(userId, userData);
  }
}
