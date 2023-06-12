import { UserRepository, BoardRepository } from "../repositories/index.js";
import { Service, Inject } from "typedi";
import { Pagination } from "../types/utils.type.js";
import { BoardDTO, BoardSimpleDTO } from "../types/dto/index.js";
import { BoardMapper, BoardSimpleViewMapper } from "../mappers/index.js";

@Service()
export class BoardService {
  userRepository: UserRepository;
  boardRepository: BoardRepository;

  constructor(@Inject() boardRepository: BoardRepository, @Inject() userRepository: UserRepository) {
    this.boardRepository = boardRepository;
    this.userRepository = userRepository;
  }

  async getBoard(boardId: string): Promise<BoardDTO> {
    const board = await this.boardRepository.getById(boardId);
    return BoardMapper(board);
  }

  async createBoard(board: any, user: any): Promise<BoardSimpleDTO>  {
    board.members = [{ user: user.id, role: "OWNER" }];
    const result = await this.boardRepository.create(board);
    return BoardSimpleViewMapper(result);
  }

  async getUserBoards(userId: string, options: Pagination): Promise<{ totalCount: number; boards: BoardSimpleDTO[] }> {
    const result = await this.boardRepository.getUserBoards(userId, options);
    return {
      ...result,
      boards: result.data.map(BoardSimpleViewMapper),
    };
  }

  async getBoards(options: Pagination): Promise<{ totalCount: number; boards: BoardSimpleDTO[] }> {
    const result = await this.boardRepository.getAllBoards(options);
    return {
      ...result,
      boards: result.data.map(BoardSimpleViewMapper),
    };
  }

  async deleteBoard(boardId: string): Promise<void> {
    await this.boardRepository.delete(boardId);
  }
}
