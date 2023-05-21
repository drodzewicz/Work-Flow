import { Pagination } from "./utils.type.js";

export class PaginationQueryParams implements Pagination {
  limit: number;
  page: number;
}

export class UserListQueryParams extends PaginationQueryParams {
  username?: string;
}
