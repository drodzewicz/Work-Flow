import { UserRepository, BoardRepository } from "../repositories/index.js";
import { Service, Inject } from "typedi";
import { Pagination } from "../types/utils.type.js";
import { BoardDTO, BoardSimpleDTO, ColumnSimpleDTO } from "../types/dto/index.js";
import { BoardMapper, BoardSimpleViewMapper, ColumnSimpleMapper } from "../mappers/index.js";
import { NotFoundError } from "routing-controllers";
import { RoleNames } from "../config/permissions.config.js";
import { InvalidMongooseIdError } from "../errors/InvalidMongooseIdError.js";

@Service()
export class BoardService {
  userRepository: UserRepository;
  boardRepository: BoardRepository;

  constructor(@Inject() boardRepository: BoardRepository, @Inject() userRepository: UserRepository) {
    this.boardRepository = boardRepository;
    this.userRepository = userRepository;
  }

  async getBoard(boardId: string): Promise<BoardDTO> {
    let board = null;
    try {
      board = await this.boardRepository.getById(boardId);
    } catch (e) {
      if (e instanceof InvalidMongooseIdError) {
        throw new NotFoundError("Board was not found.");
      } else {
        throw e;
      }
    }
    if (!board) {
      throw new NotFoundError("Board was not found.");
    }
    return BoardMapper(board);
  }

  async createBoard(board: any, userId: string): Promise<BoardSimpleDTO> {
    board.members = [{ user: userId, role: RoleNames.ADMIN }];
    const result = await this.boardRepository.create(board);
    return BoardSimpleViewMapper(result);
  }

  async getUserBoards(userId: string, options: Pagination): Promise<{ totalCount: number; boards: BoardSimpleDTO[] }> {
    const { totalCount, data } = await this.boardRepository.getUserBoards(userId, options);
    return {
      totalCount,
      boards: data.map(BoardSimpleViewMapper),
    };
  }

  async getBoards(options: Pagination): Promise<{ totalCount: number; boards: BoardSimpleDTO[] }> {
    const { totalCount, data } = await this.boardRepository.getAllBoards(options);
    return {
      totalCount,
      boards: data.map(BoardSimpleViewMapper),
    };
  }

  async updateBoard(boardId: string, data: { name?: string; description?: string }) {
    const board = await this.boardRepository.getById(boardId);
    board.name = data.name ?? board.name;
    board.description = data.description ?? board.description;
    await this.boardRepository.save(board);
    return BoardSimpleViewMapper(board);
  }

  async deleteBoard(boardId: string): Promise<void> {
    await this.boardRepository.delete(boardId);
  }

  async createColumn(boardId: string, columnName: string): Promise<ColumnSimpleDTO> {
    const column = await this.boardRepository.createColumn(boardId, columnName);
    return ColumnSimpleMapper(column);
  }

  async updateColumn(boardId: string, columnId: string, name: string): Promise<void> {
    const board = await this.boardRepository.getById(boardId);
    const column = board.columns.find((column) => column._id.equals(columnId));
    if (!column) {
      throw new NotFoundError(`column with given id: ${columnId} was not found`);
    }
    column.name = name;
    await this.boardRepository.save(board);
  }

  async updateColumnOrder(boardId: string, columnId: string, tragetIndex: number): Promise<void> {
    const board = await this.boardRepository.getById(boardId);
    const columnIndex = board.columns.findIndex((column) => column._id.equals(columnId));
    if (columnIndex < 0) {
      throw new NotFoundError(`column with given id: ${columnId} was not found`);
    }
    const column = board.columns.splice(columnIndex, 1)[0];
    board.columns.splice(tragetIndex, 0, column);
    await this.boardRepository.save(board);
  }

  async deleteColumn(boardId: string, columnId: string): Promise<void> {
    const board = await this.boardRepository.getById(boardId);
    const columnIndex = board.columns.findIndex((column) => column._id.equals(columnId));
    if (columnIndex < 0) {
      throw new NotFoundError(`column with given id: ${columnId} was not found`);
    }
    await this.boardRepository.deleteColumn(boardId, columnId);
  }
}
