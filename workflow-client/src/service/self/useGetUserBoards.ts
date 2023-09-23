import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import selfURL from "./url";

type PaginatedUserBoardList = { boards: Board[]; totalCount: number };

type GetUserBoardsProps = {
  page: number;
  limit: number;
  onSuccess?: (data: PaginatedUserBoardList) => void;
};

const useGetUserBoards = (props: GetUserBoardsProps) => {
  const { page, limit, onSuccess } = props;

  const client = useAuthClient();

  const queryData = useQuery<
    AxiosResponse<PaginatedUserBoardList>,
    unknown,
    PaginatedUserBoardList
  >(["self-boards", page], () => client.get(selfURL.boards(), { params: { page, limit } }), {
    select(response) {
      return response.data;
    },
    onSuccess,
    keepPreviousData: true,
  });
  return { ...queryData };
};

export default useGetUserBoards;
