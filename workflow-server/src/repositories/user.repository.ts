import { Service } from "typedi";
import { User } from "../models/index.js";
import { UserDocument, IUser, UserFields, BoardDocument, BoardFields } from "../types/database/index.js";
import { Pagination, PaginatedResult } from "../types/utils.type.js";
import { GenericRepository } from "./generic.repository.js";

@Service()
export class UserRepository extends GenericRepository<IUser, UserDocument, UserFields> {
  private boardFields: BoardFields[];

  constructor() {
    super();
    this.fields = ["_id", "username", "email", "name", "surname", "avatarImageURL", "password"];
    this.model = User;
    this.boardFields = ["_id", "name", "description", "columns", "timeCreated"];
  }

  async getAllUser(settings: Pagination): Promise<PaginatedResult<UserDocument>> {
    const totalCount = await this.model.count({});
    const data = (await this.model
      .find({}, this.fields.join(" "))
      .limit(settings.limit * 1)
      .skip((settings.page - 1) * settings.limit)) as UserDocument[];

    return { data, totalCount };
  }

  async getUserByRefreshToken(token: string): Promise<UserDocument> {
    return await this.model.findOne({ refreshToken: token }, this.fields.join(" "));
  }

  async getUserByUsername(username: string): Promise<UserDocument> {
    return await this.model.findOne({ username }, this.fields.join(" "));
  }

  async getUsersByMatchUsername(username: string, settings: Pagination): Promise<PaginatedResult<UserDocument>> {
    const query = { username: { $regex: username, $options: "i" } };
    const totalCount = await this.model.count(query);
    const data = (await this.model
      .find(query, this.fields.join(" "))
      .limit(settings.limit * 1)
      .skip((settings.page - 1) * settings.limit)) as UserDocument[];
    return { data, totalCount };
  }

  async updateUser(userId: string, newValues: Partial<IUser>): Promise<UserDocument> {
    return await this.model.findOneAndUpdate(
      { _id: userId },
      { ...newValues },
      { runValidators: true, context: "query" },
    );
  }

  async getUserPinnedCollection(userId: string): Promise<BoardDocument[]> {
    this.validateId(userId);
    const { pinnedBoards } = await this.model.findById(userId).populate({
      path: "pinnedBoards",
      select: this.boardFields.join(" "),
    });
    return pinnedBoards as BoardDocument[];
  }

  async addBoardToPinnedCollection(userId: string, boardId: string): Promise<void> {
    this.validateId(userId);
    this.validateId(boardId);
    await this.model.findOneAndUpdate({ _id: userId }, { $push: { pinnedBoards: boardId } });
  }

  async removeBoardFromPinnedCollection(userId: string, boardId: string): Promise<void> {
    this.validateId(userId);
    this.validateId(boardId);
    await this.model.findOneAndUpdate({ _id: userId }, { $pull: { pinnedBoards: boardId } });
  }
}
