import { Pagination } from "../types/utils.type.js";
import { env } from "../config/env.config.js";

export const getPaginationSettings = (settings: Pagination): Pagination => ({
    limit: parseInt(`${settings.limit ?? env.pagination.limit}`),
    page: parseInt(`${settings.page ?? 1}`),
});
