import { Request } from "express";

export interface Pagination {
  page: number;
  limit: number;
}

export interface PaginatedCollection extends Pagination {
  fields?: string;
}

export interface AuthRequest extends Request {
  user: string;
}