import { AxiosError } from "axios";
import { QueryFunctionContext, UseQueryOptions, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import selfQueryKeys from "./queryKeys";
import selfURL from "./url";

type PaginatedUserBoardList = { boards: Board[]; totalCount: number };

type BoardsQueryKey = ReturnType<(typeof selfQueryKeys)["boards"]>;

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

  const fetchBoards = async ({
    queryKey: [{ pagination }],
  }: QueryFunctionContext<BoardsQueryKey>) => {
    const response = await client.get(selfURL.boards(), { params: pagination });
    return response.data;
  };

  return useQuery({
    ...options,
    queryKey: selfQueryKeys.boards({ page, limit }),
    queryFn: fetchBoards,
  });
};

export default useGetUserBoards;
