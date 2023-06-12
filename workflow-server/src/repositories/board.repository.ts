import { Service } from "typedi";
import Board from "../models/board.model.js";
import User from "../models/user.model.js";
import { UserModel } from "../types/database/user.type.js";
import { BoardDocument, IBoard, BoardFields } from "../types/database/board.type.js";
import { Pagination } from "../types/utils.type.js";
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
    await this.userModel.updateMany({ pinnedBoards: boardId }, { $pull: { pinnedBoards: boardId } });
    await super.delete(boardId);
  }

  async getAllBoards(settings: Pagination) {
    const totalCount = await this.model.count({});
    const boards = (await this.model
      .find({}, this.fields.join(" "))
      .limit(settings.limit * 1)
      .skip((settings.page - 1) * settings.limit)) as BoardDocument[];

    return { boards, totalCount };
  }

  async getUserBoards(userId: string, settings: Pagination) {
    const totalCount = await this.model.count({});
    const boards = (await this.model
      .find({ "members.user": userId }, this.fields.join(" "))
      .limit(settings.limit * 1)
      .skip((settings.page - 1) * settings.limit)) as BoardDocument[];

    return { boards, totalCount };
  }
}
