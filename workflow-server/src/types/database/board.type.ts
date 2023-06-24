import { HydratedDocument, Model, Types, PopulatedDoc } from "mongoose";
import { UserDocument } from "./user.type.js";

export type BoardFields = "_id" | "name" | "description" | "members" | "tags" | "columns" | "timeCreated";

export interface IColumn {
  name: string;
}

export interface IBoard {
  name: string;
  description: string;
  timeCreated: Date;
  members: PopulatedDoc<UserDocument>[];
  tags: Types.ObjectId[];
  columns: HydratedDocument<IColumn>[];
}

export type BoardModel = Model<IBoard>;

export type BoardDocument = HydratedDocument<IBoard>;
