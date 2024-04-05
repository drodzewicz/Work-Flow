import { AxiosError } from "axios";
import { QueryFunction, UseQueryOptions, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import memberQueryKeys from "./queryKeys";
import permissionURL from "./url";

type BoardRolesQueryKey = ReturnType<(typeof memberQueryKeys)["board"]>;

type OptionsType = Omit<
    UseQueryOptions<BoardRoles, AxiosError, BoardRoles, BoardRolesQueryKey>,
    "queryKey" | "queryFn"
>;

type GetBoardRolesProps = { boardId: string } & OptionsType;

const useGetBoardRoles = ({ boardId, ...options }: GetBoardRolesProps) => {
    const client = useAuthClient();

    const fetchBoardRoles: QueryFunction<BoardRoles, BoardRolesQueryKey> = async ({
        queryKey: [{ listId }],
    }) => {
        const response = await client.get(permissionURL.boardRoles(listId));
        return response.data;
    };

    return useQuery<BoardRoles, AxiosError, BoardRoles, BoardRolesQueryKey>({
        ...options,
        queryKey: memberQueryKeys.board(boardId),
        queryFn: fetchBoardRoles,
        staleTime: 10 * 60 * 1000,
    });
};

export default useGetBoardRoles;
