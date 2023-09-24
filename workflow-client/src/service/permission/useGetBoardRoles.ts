import { AxiosError } from "axios";
import { QueryFunction, QueryFunctionContext, UseQueryOptions, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import memberQueryKeys from "./queryKeys";
import permissionURL from "./url";

type BoardRole = Record<string, { permissions: string[] }>;

type BoardRolesQueryKey = ReturnType<(typeof memberQueryKeys)["board"]>;

type OptionsType = Omit<
  UseQueryOptions<BoardRole, AxiosError, BoardRole, BoardRolesQueryKey>,
  "queryKey" | "queryFn"
>;

type GetBoardRolesProps = { boardId: string } & OptionsType;

const useGetBoardRoles = ({ boardId, ...options }: GetBoardRolesProps) => {
  const client = useAuthClient();

  const fetchBoardRoles: QueryFunction<BoardRole, BoardRolesQueryKey> = async ({
    queryKey: [{ listId }],
  }) => {
    const response = await client.get(permissionURL.boardRoles(listId));
    return response.data;
  };

  return useQuery<BoardRole, AxiosError, BoardRole, BoardRolesQueryKey>({
    ...options,
    queryKey: memberQueryKeys.board(boardId),
    queryFn: fetchBoardRoles,
  });
};

export default useGetBoardRoles;
