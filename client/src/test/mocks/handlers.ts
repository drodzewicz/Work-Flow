import permissionURL from "@/service/permission/url";
import taskURL from "@/service/task/url";
import memberURL from "@/service/member/url";
import tagURL from "@/service/tag/url";
import columnURL from "@/service/column/url";

import { PermissionsReposne } from "@/service/permission/useGetCurrentUserBoardRole";
import { http, HttpResponse } from "msw";
import { columnsWithTasks, columns } from "@/test/data";
import { Permissions } from "@/hooks/useRBAC";
import { UserListPaginated } from "@/service/member/useSearchBoardMembers";
import { apiURl, socketURl } from "../utils";

export const handlers = [
  http.get(socketURl("/socket.io/"), () => {
    return HttpResponse.json(null);
  }),
  http.get(apiURl(tagURL.index), () => {
    return HttpResponse.json<Tag[]>([]);
  }),
  http.get(apiURl(memberURL.index("*")), () => {
    return HttpResponse.json<UserListPaginated>({ members: [], totalCount: 0 });
  }),
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
  http.post(apiURl(columnURL.index("*")), () => {
    return HttpResponse.json<Column>(columns[0]);
  }),
];
