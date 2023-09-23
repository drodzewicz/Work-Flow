import { AxiosError } from "axios";
import { QueryFunctionContext, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import boardQueryKeys from "./queryKeys";
import boardURL from "./url";

type BoardResponse = {
  _id: string;
  timeCreated: string;
  name: string;
  description: string;
  columns: Column[];
};

type GetBoardProps = { boardId: string; onError?: () => void };

type BoardQueryKey = ReturnType<(typeof boardQueryKeys)["item"]>;

const useGetBoard = ({ boardId, onError }: GetBoardProps) => {
  const client = useAuthClient();

  const fetchBoard = async ({ queryKey: [{ id }] }: QueryFunctionContext<BoardQueryKey>) => {
    const response = await client.get(boardURL.read(id));
    return response.data;
  };

  return useQuery<BoardResponse, AxiosError, BoardResponse, BoardQueryKey>({
    queryKey: boardQueryKeys.item(boardId),
    queryFn: fetchBoard,
    enabled: !!boardId,
    onError: onError,
  });
};

export default useGetBoard;
