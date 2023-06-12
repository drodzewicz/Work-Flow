import { HydratedDocument, Model, Types, PopulatedDoc } from "mongoose";
import { UserDocument } from "./user.type.js";

export type BoardFields = "_id" | "name" | "description" | "members" | "tags" | "columns" | "timeCreated";

export interface IBoard {
  name: string;
  description: string;
  timeCreated: Date;
  members: PopulatedDoc<UserDocument>[];
  tags: Types.ObjectId[];
  columns: unknown[];
}

export type BoardModel = Model<IBoard>;

export type BoardDocument = HydratedDocument<IBoard>;
