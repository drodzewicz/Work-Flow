import { UserRepository } from "../repositories/user.repository.js";
import { Service, Inject } from "typedi";
import { User as UserType } from "../types/index.js";

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

  async updateUserInfo(userId: string, userData: UserType) {
    return await this.userRepository.updateUser(userId, userData);
  }

  async getUsersByMatchUsername(username: string) {
    return await this.userRepository.getUsersByMatchUsername(username);
  }
}
