import { HydratedDocument, Model, Types, PopulatedDoc } from "mongoose";
import { BoardDocument } from "./board.type.js";

export type UserFields = "_id" | "username" | "email" | "name" | "surname" | "avatarImageURL" | "password";

export interface IUser {
  username: string;
  password: string;
  refreshToken?: string;
  name: string;
  surname: string;
  email: string;
  avatarImageURL?: string;
  pinnedBoards?: PopulatedDoc<BoardDocument>[];
  notifications?: unknown[];
}

export interface IUserMethods {
  isValidPassword: (password: string) => Promise<boolean>;
}

export type UserModel = Model<IUser, {}, IUserMethods>;

export type UserDocument = HydratedDocument<IUser, IUserMethods>;