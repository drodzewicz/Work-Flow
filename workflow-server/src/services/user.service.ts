import { UserRepository } from "../repositories/user.repository.js";
import { Service, Inject } from "typedi";
import { IUser } from "../types/database/user.type.js";
import { Pagination } from "../types/utils.type.js";
import { getPaginationSettings } from "../utils/pagination.utils.js";
import { UserMapper } from "../mappers/user.mapper.js";
import { UserDTO } from "../types/dto/user.dto.js";
import { BoardMapper } from "../mappers/board.mapper.js";
import { BoardDTO } from "../types/dto/board.dto.js";
import { BoardDocument } from "../types/database/board.type.js";

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

  async updateUserInfo(userId: string, userData: IUser): Promise<UserDTO> {
    const user = await this.userRepository.updateUser(userId, userData);
    return UserMapper(user);
  }

  async getUserPinnedBoards(userId: string) {
    const boards = await this.userRepository.getUserPinnedCollection(userId);
    return boards.map(BoardMapper);
  }

  async togglePinBoard(userId: string, boardId: string) {
    const boards = await this.userRepository.getUserPinnedCollection(userId);
    if (boards.find(({ _id }) => _id.equals(boardId))) {
      await this.userRepository.removeBoardFromPinnedCollection(userId, boardId);
      return false;
    } else {
      await this.userRepository.addBoardToPinnedCollection(userId, boardId);
      return true;
    }
  }
}
