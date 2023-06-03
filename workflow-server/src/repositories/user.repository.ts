import { Service } from "typedi";
import User from "../models/user.model.js";
import { UserDocument, IUser, UserFields } from "../types/database/user.type.js";
import { Pagination } from "../types/utils.type.js";
import { GenericRepository } from "./generic.repository.js";

@Service()
export class UserRepository extends GenericRepository<IUser, UserDocument, UserFields> {
  constructor() {
    super();
    this.fields = ["_id", "username", "email", "name", "avatarImageURL", "password"];
    this.model = User;
  }

  async getAllUser(settings: Pagination): Promise<{ users: UserDocument[]; totalCount: number }> {
    const totalCount = await this.model.count({});
    const users = (await this.model
      .find({}, this.fields.join(" "))
      .limit(settings.limit * 1)
      .skip((settings.page - 1) * settings.limit)) as UserDocument[];

    return { users, totalCount };
  }

  async getUserByRefreshToken(token: string): Promise<UserDocument> {
    return await this.model.findOne({ refreshToken: token }, this.fields.join(" "));
  }

  async getUserByUsername(username: string): Promise<UserDocument> {
    return await this.model.findOne({ username }, this.fields.join(" "));
  }

  async getUsersByMatchUsername(
    username: string,
    settings: Pagination,
  ): Promise<{ users: UserDocument[]; totalCount: number }> {
    const query = { username: { $regex: username, $options: "i" } };
    const totalCount = await this.model.count(query);
    const users = (await this.model
      .find(query, this.fields.join(" "))
      .limit(settings.limit * 1)
      .skip((settings.page - 1) * settings.limit)) as UserDocument[];
    return { users, totalCount };
  }

  async updateUser(userId: string, newValues: Partial<IUser>): Promise<UserDocument> {
    return await this.model.findOneAndUpdate(
      { _id: userId },
      { ...newValues },
      { runValidators: true, context: "query" },
    );
  }
}
