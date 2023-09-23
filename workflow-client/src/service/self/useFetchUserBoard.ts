import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

type PaginatedUserBoardList = { boards: Board[]; totalCount: number };

type FetchUserBoardProps = {
  page: number;
  limit: number;
  onSuccess?: (data: PaginatedUserBoardList) => void;
};

const useFetchUserBoards = (props: FetchUserBoardProps) => {
  const { page, limit, onSuccess } = props;

  const client = useAuthClient();

  const queryData = useQuery<
    AxiosResponse<PaginatedUserBoardList>,
    unknown,
    PaginatedUserBoardList
  >(["self-boards", page], () => client.get("/self/boards", { params: { page, limit } }), {
    select(response) {
      return response.data;
    },
    onSuccess,
    keepPreviousData: true,
  });
  return { ...queryData };
};

export default useFetchUserBoards;
