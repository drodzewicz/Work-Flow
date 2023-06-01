import { Service } from "typedi";
import UserModel from "../models/user.model.js";
import { IUserModel } from "../types/database/user.type.js";
import { User as UserType } from "../types/index.js";
import { Pagination } from "../types/utils.type.js";
import { UserFields } from "../types/database/user.type.js";
import { GenericRepository } from "./generic.repository.js";

@Service()
export class UserRepository extends GenericRepository<IUserModel, UserFields> {
  constructor() {
    super();
    this.fields = ["_id", "username", "email", "name", "avatarImageURL", "password"];
    this.model = UserModel;
  }

  async getAllUser(settings: Pagination): Promise<{ users: IUserModel[]; totalCount: number }> {
    const totalCount = await this.model.count({});
    const users = (await this.model
      .find({}, this.fields.join(" "))
      .limit(settings.limit * 1)
      .skip((settings.page - 1) * settings.limit)) as IUserModel[];

    return { users, totalCount };
  }

  async getUserByRefreshToken(token: string): Promise<IUserModel> {
    return await this.model.findOne({ refreshToken: token }, this.fields.join(" "));
  }

  async getUserByUsername(username: string): Promise<IUserModel> {
    return await this.model.findOne({ username }, this.fields.join(" "));
  }

  async getUsersByMatchUsername(
    username: string,
    settings: Pagination,
  ): Promise<{ users: IUserModel[]; totalCount: number }> {
    const query = { username: { $regex: username, $options: "i" } };
    const totalCount = await this.model.count(query);
    const users = (await this.model
      .find(query, this.fields.join(" "))
      .limit(settings.limit * 1)
      .skip((settings.page - 1) * settings.limit)) as IUserModel[];
    return { users, totalCount };
  }

  async createUser(userData: UserType): Promise<IUserModel> {
    const { username, password, name, surname, email } = userData;
    const newUser = new UserModel({ username, password, name, surname, email });
    return await newUser.save();
  }

  async updateUser(userId: string, newValues: Partial<unknown>): Promise<IUserModel> {
    return await this.model.findOneAndUpdate(
      { _id: userId },
      { ...newValues },
      { runValidators: true, context: "query" },
    );
  }
}
