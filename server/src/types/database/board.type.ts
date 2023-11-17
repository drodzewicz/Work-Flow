import { HydratedDocument, Model, Types, PopulatedDoc } from "mongoose";
import { UserDocument } from "./user.type.js";
import { TaskDocument } from "./task.type.js";
import { RoleNames } from "../../config/permissions.config.js";

export type BoardFields = "_id" | "name" | "description" | "members" | "tags" | "columns" | "timeCreated";

export interface IColumn {
  name: string;
  tasks: PopulatedDoc<TaskDocument>[];
}

export type ColumnDocument = HydratedDocument<IColumn>;

export type BoardMember = { role: RoleNames; user: PopulatedDoc<UserDocument> };

export interface IBoard {
  name: string;
  description: string;
  timeCreated: Date;
  members: BoardMember[];
  tags: Types.ObjectId[];
  columns: ColumnDocument[];
}

export type BoardModel = Model<IBoard>;

export type BoardDocument = HydratedDocument<IBoard>;
