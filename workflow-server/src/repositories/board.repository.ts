import { Service } from "typedi";
import { User, Board } from "../models/index.js";
import { UserModel, BoardDocument, IBoard, BoardFields } from "../types/database/index.js";
import { Pagination, PaginatedResult } from "../types/utils.type.js";
import { GenericRepository } from "./generic.repository.js";

@Service()
export class BoardRepository extends GenericRepository<IBoard, BoardDocument, BoardFields> {
  private userModel: UserModel;

  constructor() {
    super();
    this.fields = ["_id", "name", "description", "columns", "timeCreated"];
    this.model = Board;
    this.userModel = User;
  }

  async delete(boardId: string) {
    this.validateId(boardId);
    await this.userModel.updateMany({ pinnedBoards: boardId }, { $pull: { pinnedBoards: boardId } });
    await super.delete(boardId);
  }

  async getAllBoards(settings: Pagination): Promise<PaginatedResult<BoardDocument>> {
    const totalCount = await this.model.count({});
    const data = (await this.model
      .find({}, this.fields.join(" "))
      .limit(settings.limit * 1)
      .skip((settings.page - 1) * settings.limit)) as BoardDocument[];

    return { data, totalCount };
  }

  async getUserBoards(userId: string, settings: Pagination): Promise<PaginatedResult<BoardDocument>> {
    const totalCount = await this.model.count({});
    const data = (await this.model
      .find({ "members.user": userId }, this.fields.join(" "))
      .limit(settings.limit * 1)
      .skip((settings.page - 1) * settings.limit)) as BoardDocument[];

    return { data, totalCount };
  }

  async createColumn(boardId: string, columnName: string) {
    this.validateId(boardId);
    return await this.model.findOneAndUpdate({ _id: boardId }, { $push: { columns: { name: columnName } } });
  }

  async deleteColumn(boardId: string, columnId: string) {
    this.validateId(boardId);
    this.validateId(columnId);
    return await this.model.findOneAndUpdate({ _id: boardId }, { $pull: { columns: { _id: columnId } } });
  }
}
