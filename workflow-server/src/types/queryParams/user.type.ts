import { Pagination } from "../utils.type.js";

export interface UserListQueryParams extends Pagination {
  username?: string;
  ignoreBoard?: string;
}

export interface BoardMembersListQueryParams extends Pagination {
  username?: string;
}
