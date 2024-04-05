import { HydratedDocument, Model, Types, PopulatedDoc } from "mongoose";
import { BoardDocument } from "./board.type.js";

export type UserFields =
    | "_id"
    | "username"
    | "email"
    | "name"
    | "surname"
    | "avatarImageURL"
    | "password";

export type UserNotificationFields = "_id" | "notifications";

export interface INotification {
    title: string;
    description?: string;
    key: string;
    attributes?: Record<string, unknown>;
    timeStamp: Date;
}

export interface NotificationDocument extends INotification {
    _id: Types.ObjectId;
}

export interface IUser {
    username: string;
    password: string;
    refreshToken?: string;
    name: string;
    surname: string;
    email: string;
    avatarImageURL?: string;
    pinnedBoards?: PopulatedDoc<BoardDocument>[];
    notifications?: NotificationDocument[];
}

export interface IUserMethods {
    isValidPassword: (password: string) => Promise<boolean>;
}

export type UserModel = Model<IUser, object, IUserMethods>;

export type UserDocument = HydratedDocument<IUser, IUserMethods>;
