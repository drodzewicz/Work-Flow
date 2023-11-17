import { HydratedDocument, Model, Types } from "mongoose";

export type TagFields = "_id" | "name" | "key" | "board";

export interface ITag {
  name: string;
  key: string;
  board: Types.ObjectId,
}

export type TagModel = Model<ITag>;

export type TagDocument = HydratedDocument<ITag>;