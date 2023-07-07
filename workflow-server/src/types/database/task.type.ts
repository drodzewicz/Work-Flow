import { HydratedDocument, Model, PopulatedDoc, Types } from "mongoose";
import { UserDocument } from "./user.type.js";

export type TaskFields = "_id" | "title" | "description" | "author" | "assignees" | "tags" | "board";

export interface ITask {
  title: string;
  description: string;
  author: PopulatedDoc<UserDocument>,
  board: Types.ObjectId,
  assignees: PopulatedDoc<UserDocument>[];
  tags: Types.ObjectId[];
}

export type TaskModel = Model<ITask>;

export type TaskDocument = HydratedDocument<ITask>;