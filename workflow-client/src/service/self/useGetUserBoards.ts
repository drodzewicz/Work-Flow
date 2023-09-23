import { AxiosError } from "axios";
import { QueryFunctionContext, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import selfQueryKeys from "./queryKeys";
import selfURL from "./url";

type PaginatedUserBoardList = { boards: Board[]; totalCount: number };

type GetUserBoardsProps = {
  page: number;
  limit: number;
  onSuccess?: (data: PaginatedUserBoardList) => void;
};

type BoardsQueryKey = ReturnType<(typeof selfQueryKeys)["boards"]>;

const useGetUserBoards = (props: GetUserBoardsProps) => {
  const { page, limit, onSuccess } = props;

  const client = useAuthClient();

  const fetchBoards = async ({
    queryKey: [{ pagination }],
  }: QueryFunctionContext<BoardsQueryKey>) => {
    const response = await client.get(selfURL.boards(), { params: pagination });
    return response.data;
  };

  return useQuery<PaginatedUserBoardList, AxiosError, PaginatedUserBoardList, BoardsQueryKey>({
    queryKey: selfQueryKeys.boards({ page, limit }),
    queryFn: fetchBoards,
    keepPreviousData: true,
    onSuccess,
  });
};

export default useGetUserBoards;
