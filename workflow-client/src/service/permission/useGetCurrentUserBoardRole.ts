import { AxiosError, AxiosResponse } from "axios";
import { QueryFunctionContext, useQuery } from "react-query";

import useAuth from "@/hooks/useAuth";
import useAuthClient from "@/hooks/useClient";

import permissionsQueryKeys from "./queryKeys";
import permissionURL from "./url";

type GetCurrentUserBoardRoleProps = {
  boardId: string;
};

type PermissionsReposne = {
  role: string;
  permissions: string[];
};

type UserBoardRoleQueryKey = ReturnType<(typeof permissionsQueryKeys)["boardUser"]>;

const useGetCurrentUserBoardRole = ({ boardId }: GetCurrentUserBoardRoleProps) => {
  const { user } = useAuth();
  const client = useAuthClient();

  const fetchCurrentUserBoardRole = async ({
    queryKey: [
      {
        id: { boardId, userId },
      },
    ],
  }: QueryFunctionContext<UserBoardRoleQueryKey>) => {
    const response = await client.get(permissionURL.userBoardRole(boardId, userId));
    return response.data;
  };

  return useQuery<PermissionsReposne, AxiosError, PermissionsReposne, UserBoardRoleQueryKey>({
    queryKey: permissionsQueryKeys.boardUser(boardId, user?._id || ""),
    queryFn: fetchCurrentUserBoardRole,
    staleTime: 1000 * 60 * 1,
  });
};

export default useGetCurrentUserBoardRole;
