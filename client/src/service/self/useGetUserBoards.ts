import { AxiosError } from "axios";
import { QueryFunctionContext, UseQueryOptions, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import selfQueryKeys from "./queryKeys";
import selfURL from "./url";
import { useState } from "react";

type PaginatedUserBoardList = { boards: Board[]; totalCount: number };

type BoardsQueryKey = ReturnType<(typeof selfQueryKeys)["paginatedBoards"]>;

type OptionsType = Omit<
    UseQueryOptions<PaginatedUserBoardList, AxiosError, PaginatedUserBoardList, BoardsQueryKey>,
    "queryKey" | "queryFn"
>;

type GetUserBoardsProps = {
    page: number;
    limit: number;
} & OptionsType;

const useGetUserBoards = ({ page, limit, ...options }: GetUserBoardsProps) => {
    const client = useAuthClient();
    const [searchTerm, setSearchTerm] = useState<string>("");
    
    const fetchBoards = async ({
        queryKey: [{ pagination, name }],
    }: QueryFunctionContext<BoardsQueryKey>) => {
        const response = await client.get(selfURL.boards(), { params: { ...pagination, name } });
        return response.data;
    };

    const search = (searchString: string) => {
        setSearchTerm(searchString);
    };

    const clear = () => {
        setSearchTerm("");
    };

    const query =  useQuery({
        ...options,
        queryKey: selfQueryKeys.paginatedBoards({ page, limit, name: searchTerm }),
        queryFn: fetchBoards,
        staleTime: 5 * 60 * 1000,
    });

    return { ...query, search, clear, searchTerm };
};

export default useGetUserBoards;
