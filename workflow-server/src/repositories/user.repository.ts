import { Service } from "typedi";
import { Document, Types } from "mongoose";
import User from "../models/user.model.js";
import { User as UserType } from "../types/index.js";
import { InvalidMongooseIdError } from "../errors/InvalidMongooseIdError.js";
import { PaginatedCollection } from "../types/utils.type.js";

@Service()
export class UserRepository {
  async save(user: Document<unknown>) {
    await user.save();
  }

  async getUserById(userId: string, fields?: string) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new InvalidMongooseIdError("Provided invalid id for user");
    }
    fields = fields || "_id username name surname email avatarImageURL password";
    return await User.findById(userId, fields);
  }

  async getAllUser(settings: PaginatedCollection) {
    const fields = settings.fields || "_id username name surname email avatarImageURL password";

    const totalCount = await User.count({});
    const users = await User.find({}, fields)
      .limit(settings.limit * 1)
      .skip((settings.page - 1) * settings.limit);

    return { users, totalCount };
  }

  async getUserByUsername(username: string, settings?: { fields?: string }) {
    const fields = settings?.fields || "_id username avatarImageURL";
    return await User.findOne({ username }, fields);
  }

  async getUsersByMatchUsername(username: string, settings: PaginatedCollection) {
    const fields = settings.fields || "_id username avatarImageURL";
    const query = { username: { $regex: username, $options: "i" } };
    const totalCount = await User.count(query);
    const users = await User.find(query, fields)
      .limit(settings.limit * 1)
      .skip((settings.page - 1) * settings.limit);
    return { users, totalCount };
  }

  async createUser(userData: UserType) {
    const { username, password, name, surname, email } = userData;
    const newUser = new User({ username, password, name, surname, email });
    return await newUser.save();
  }

  async updateUser(userId: string, newValues: Partial<UserType>) {
    return await User.findOneAndUpdate({ _id: userId }, { ...newValues }, { runValidators: true, context: "query" });
  }
}
