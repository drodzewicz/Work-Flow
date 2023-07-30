import { UserRepository, BoardRepository } from "../repositories/index.js";
import { Service, Inject } from "typedi";
import { IUser, INotification } from "../types/database/index.js";
import { Pagination } from "../types/utils.type.js";
import { UserDTO, BoardSimpleDTO } from "../types/dto/index.js";
import { BoardSimpleViewMapper, UserMapper } from "../mappers/index.js";
import { NotFoundError } from "routing-controllers";
import { UpdateUserPayload } from "../types/request/user.type.js";

@Service()
export class UserService {
  userRepository: UserRepository;
  boardRepository: BoardRepository;

  constructor(@Inject() userRepository: UserRepository, @Inject() boardRepository: BoardRepository) {
    this.userRepository = userRepository;
    this.boardRepository = boardRepository;
  }

  async getUser(userId: string): Promise<UserDTO> {
    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new NotFoundError("User was not found.");
    }
    return UserMapper(user);
  }

  async getAllUsers(options: Pagination): Promise<{ totalCount: number; users: UserDTO[] }> {
    const { data, totalCount } = await this.userRepository.getAllUser(options);
    return {
      totalCount,
      users: data.map(UserMapper),
    };
  }

  async getUsersByMatchUsername(
    username: string,
    options: Pagination,
  ): Promise<{ totalCount: number; users: UserDTO[] }> {
    const { data, totalCount } = await this.userRepository.getUsersByMatchUsername(username, options);
    return {
      totalCount,
      users: data.map(UserMapper),
    };
  }

  async updateUser(userId: string, userData: UpdateUserPayload): Promise<UserDTO> {
    const user = await this.userRepository.getById(userId);
    if (!user) {
      throw new NotFoundError("User was not found.");
    }
    user.name = userData.name ?? user.name;
    user.surname = userData.surname ?? user.surname;
    user.email = userData.email ?? user.email;
    await this.userRepository.save(user);
    return UserMapper(user);
  }

  async updateUserInfo(userId: string, userData: IUser): Promise<UserDTO> {
    const user = await this.userRepository.updateUser(userId, userData);
    return UserMapper(user);
  }

  async getUserPinnedBoards(userId: string): Promise<BoardSimpleDTO[]> {
    const boards = await this.userRepository.getUserPinnedCollection(userId);
    return boards.map(BoardSimpleViewMapper);
  }

  async togglePinBoard(userId: string, boardId: string): Promise<boolean> {
    const board = await this.boardRepository.getById(boardId);
    if (!board) {
      throw new NotFoundError("Board does not exist");
    }
    const boards = await this.userRepository.getUserPinnedCollection(userId);
    if (boards.find(({ _id }) => _id.equals(boardId))) {
      await this.userRepository.removeBoardFromPinnedCollection(userId, boardId);
      return false;
    } else {
      await this.userRepository.addBoardToPinnedCollection(userId, boardId);
      return true;
    }
  }

  async getUserNotifications(userId: string) {
    return await this.userRepository.getUserNotifications(userId);
  }

  async addUserNotifications(userId: string, notificationData: Pick<INotification, "title" | "attributes" | "description" | "key">) {
    return await this.userRepository.addUserNotifications(userId, notificationData);
  }

  async removeUserNotifications(userId: string, notificationId: string) {
    await this.userRepository.removeUserNotifications(userId, notificationId);
  }
}
