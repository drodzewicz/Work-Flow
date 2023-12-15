import { env } from "@/config/env.config";
import permissionURL from "@/service/permission/url";
import taskURL from "@/service/task/url";
import { PermissionsReposne } from "@/service/permission/useGetCurrentUserBoardRole";
import { http, HttpResponse } from "msw";
import { columnsWithTasks } from "@/test/data";
import { Permissions } from "@/hooks/useRBAC";

const API_URL_BASENAME = [
  `${env.environment === "production" ? "" : env.api.url}`,
  env.api.prefix,
].join("/");

export const apiURl = (path: string) => API_URL_BASENAME + path;

export const handlers = [
  http.get(apiURl(taskURL.index), () => {
    return HttpResponse.json<ColumnWithTasks[]>(columnsWithTasks);
  }),
  http.get(apiURl(permissionURL.userBoardRole("*", "*")), () => {
    return HttpResponse.json<PermissionsReposne>({
      permissions: [
        Permissions.TASK_CREATE,
        Permissions.TASK_DELETE,
        Permissions.TASK_MOVE,
        Permissions.COLUMN_CREATE,
        Permissions.COLUMN_DELETE,
        Permissions.COLUMN_MOVE,
      ],
      role: "ADMIN",
    });
  }),
];
