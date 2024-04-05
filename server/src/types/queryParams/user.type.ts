import { Pagination } from "../utils.type.js";

export interface UserListQueryParams extends Pagination {
    username?: string;
}

export interface BoardMembersListQueryParams extends Pagination {
    username?: string;
}
