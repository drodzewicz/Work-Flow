import { UserRepository, BoardRepository } from "../repositories/index.js";
import { Service, Inject } from "typedi";
import { Pagination } from "../types/utils.type.js";
import { BoardDTO, BoardSimpleDTO } from "../types/dto/index.js";
import { BoardMapper, BoardSimpleViewMapper } from "../mappers/index.js";
import { NotFoundError } from "routing-controllers";

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

  async createBoard(board: any, user: any): Promise<BoardSimpleDTO> {
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

  async createColumn(boardId: string, columnName: string) {
    await this.boardRepository.createColumn(boardId, columnName);
    return this.getBoard(boardId);
  }

  async updateColumn(boardId: string, columnId: string, name: string) {
    const board = await this.boardRepository.getById(boardId);
    const column = board.columns.find(column => column._id.equals(columnId))
    if (!column) {
      throw new NotFoundError(`column with given id: ${columnId} was not found`);
    }
    column.name = name;
    this.boardRepository.save(board);
  }

  async updateColumnOrder(boardId: string, columnId: string, tragetIndex: number) {
    const board = await this.boardRepository.getById(boardId);
    const columnIndex = board.columns.findIndex(column => column._id.equals(columnId))
    if (columnIndex < 0) {
      throw new NotFoundError(`column with given id: ${columnId} was not found`);
    }
    const column = board.columns.splice(columnIndex, 1)[0];
    board.columns.splice(tragetIndex, 0, column);
    this.boardRepository.save(board);
  }

  async deleteColumn(boardId: string, columnId: string) {
    const board = await this.boardRepository.getById(boardId);
    const columnIndex = board.columns.findIndex(column => column._id.equals(columnId))
    if (columnIndex < 0) {
      throw new NotFoundError(`column with given id: ${columnId} was not found`);
    }
    this.boardRepository.deleteColumn(boardId, columnId);
  }
}
