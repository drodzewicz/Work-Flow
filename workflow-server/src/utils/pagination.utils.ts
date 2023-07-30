import { Pagination } from "../types/utils.type.js";
import { env } from "../config/env.config.js";

export const getPaginationSettings = (settings: Pagination): Pagination => ({
  limit: settings.limit ?? env.pagination.limit,
  page: settings.page ?? 1,
});
