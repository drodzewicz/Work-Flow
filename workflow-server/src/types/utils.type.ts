import { Request } from "express";
import { ObjectId } from "mongoose";

export enum Model {
  User = "User",
  Board = "Board",
  Task = "Task",
  Tag = "Tag",
}

export type Pagination = {
  page: number;
  limit: number;
};

export interface PaginatedResult<T> {
  totalCount: number;
  data: T[];
}

export interface AuthUser {
  id: ObjectId;
  username: string;
}

export interface AuthRequest extends Request {
  user: AuthUser;
}
