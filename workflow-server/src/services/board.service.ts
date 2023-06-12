import { UserRepository } from "../repositories/user.repository.js";
import { BoardRepository } from "../repositories/board.repository.js";
import { Service, Inject } from "typedi";
import { IUser } from "../types/database/user.type.js";
import { IBoard } from "../types/database/board.type.js";
import { Pagination } from "../types/utils.type.js";
import { getPaginationSettings } from "../utils/pagination.utils.js";
import { BoardMapper, BoardSimpleViewMapper } from "../mappers/board.mapper.js";
import { BoardDTO, BoardSimpleDTO } from "../types/dto/board.dto.js";

@Service()
export class BoardService {
  userRepository: UserRepository;
  boardRepository: BoardRepository;

  constructor(@Inject() boardRepository: BoardRepository, @Inject() userRepository: UserRepository) {
    this.boardRepository = boardRepository;
    this.userRepository = userRepository;
  }

  async getBoard(boardId: string){
    const board = await this.boardRepository.getById(boardId);
    return BoardMapper(board);
  }

  async createBoard(board: any, user: any) {
    board.members = [{ user: user.id, role: "OWNER" }];
    const result = await this.boardRepository.create(board);
    return BoardSimpleViewMapper(result);
  }

  async getUserBoards(userId: string, options: Pagination): Promise<{ totalCount: number; boards: BoardSimpleDTO[] }> {
    const result = await this.boardRepository.getUserBoards(userId, options);
    return {
      ...result,
      boards: result.boards.map(BoardSimpleViewMapper),
    };
  }

  async getBoards(options: Pagination): Promise<{ totalCount: number; boards: BoardSimpleDTO[] }> {
    const result = await this.boardRepository.getAllBoards(options);
    return {
      ...result,
      boards: result.boards.map(BoardSimpleViewMapper),
    };
  }

  async deleteBoard(boardId: string) {
    await this.boardRepository.delete(boardId);
  }
}
