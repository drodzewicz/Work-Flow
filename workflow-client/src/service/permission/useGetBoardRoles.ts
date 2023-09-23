import { AxiosError } from "axios";
import { QueryFunctionContext, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import memberQueryKeys from "./queryKeys";
import permissionURL from "./url";

type GetBoardRolesProps = { boardId: string };

type BoardRole = Record<string, { permissions: string[] }>;

type BoardRolesQueryKey = ReturnType<(typeof memberQueryKeys)["board"]>;

const useGetBoardRoles = ({ boardId }: GetBoardRolesProps) => {
  const client = useAuthClient();

  const fetchBoardRoles = async ({
    queryKey: [{ listId }],
  }: QueryFunctionContext<BoardRolesQueryKey>) => {
    const response = await client.get(permissionURL.boardRoles(listId));
    return response.data;
  };

  return useQuery<BoardRole, AxiosError, BoardRole, BoardRolesQueryKey>({
    queryKey: memberQueryKeys.board(boardId),
    queryFn: fetchBoardRoles,
  });
};

export default useGetBoardRoles;
