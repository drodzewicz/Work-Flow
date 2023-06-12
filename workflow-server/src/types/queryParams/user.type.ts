import { Pagination } from "../utils.type.js";

export interface UserListQueryParams extends Pagination {
  username?: string;
}
