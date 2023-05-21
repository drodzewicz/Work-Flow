import User from "../models/user.model.js";
import { Service } from "typedi";
import { Document, Types } from "mongoose";
import { User as UserType } from "../types/index.js";
import { InvalidMongooseIdError } from "../errors/InvalidMongooseIdError.js";

@Service()
export class UserRepository {
  async save(user: Document<UserType>) {
    await user.save();
  }

  async getUserById(userId: string, fields?: string) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new InvalidMongooseIdError("Provided invalid id for user");
    }
    fields = fields || "_id username name surname email avatarImageURL password";
    return await User.findById(userId, fields);
  }

  async getUserByUsername(username: string, fields?: string) {
    fields = fields || "_id username name surname email avatarImageURL password";
    return await User.findOne({ username }, fields);
  }

  async getUsersByMatchUsername(username: string, fields?: string) {
    fields = fields || "_id username avatarImageURL";
    return await User.find({ username: { $regex: username, $options: "i" } }, fields);
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
