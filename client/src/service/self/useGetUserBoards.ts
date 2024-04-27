import { AxiosError } from "axios";
import { QueryFunction, UseQueryOptions, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import selfQueryKeys from "./queryKeys";
import selfURL from "./url";

type PaginatedUserBoardList = { boards: Board[]; totalCount: number };

type BoardsQueryKey = ReturnType<(typeof selfQueryKeys)["paginatedBoards"]>;

type OptionsType = Omit<
    UseQueryOptions<PaginatedUserBoardList, AxiosError, PaginatedUserBoardList, BoardsQueryKey>,
    "queryKey" | "queryFn"
>;

type GetUserBoardsProps = {
    page: number;
    limit: number;
    boardName?: string;
} & OptionsType;

const useGetUserBoards = ({ page, limit, boardName, ...options }: GetUserBoardsProps) => {
    const client = useAuthClient();

    const fetchBoards: QueryFunction<PaginatedUserBoardList, BoardsQueryKey> = async ({
        queryKey: [{ pagination, name }],
    }) => {
        const response = await client.get(selfURL.boards(), { params: { ...pagination, name } });
        return response.data;
    };

    return useQuery({
        ...options,
        queryKey: selfQueryKeys.paginatedBoards({ page, limit, name: boardName }),
        queryFn: fetchBoards,
        staleTime: 5 * 60 * 1000,
    });
};

export default useGetUserBoards;
