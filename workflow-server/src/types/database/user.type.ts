import { Document } from "mongoose";

export type UserFields = "_id" | "username" | "email" | "name" | "surname" | "avatarImageURL" | "password";

export interface IUserModel extends Document {
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
