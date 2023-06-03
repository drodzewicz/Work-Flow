import { HydratedDocument, Model } from "mongoose";

export type UserFields = "_id" | "username" | "email" | "name" | "surname" | "avatarImageURL" | "password";

export interface IUser {
  username: string;
  password: string;
  refreshToken?: string;
  name: string;
  surname: string;
  email: string;
  avatarImageURL?: string;
  pinnedBoards?: unknown[];
  notifications?: unknown[];
}

// Put all user instance methods in this interface:
export interface IUserMethods {
  isValidPassword: (password: string) => Promise<boolean>;
}

export type UserModel = Model<IUser, {}, IUserMethods>;

export type UserDocument = HydratedDocument<IUser, IUserMethods>;