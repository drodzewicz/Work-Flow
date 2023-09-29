import { AxiosError } from "axios";
import { QueryFunction, UseQueryOptions, useQuery } from "react-query";

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

type BoardQueryKey = ReturnType<(typeof boardQueryKeys)["item"]>;

type OptionsType = Omit<
  UseQueryOptions<BoardResponse, AxiosError, BoardResponse, BoardQueryKey>,
  "queryKey" | "queryFn"
>;

type GetBoardProps = { boardId: string } & OptionsType;

const useGetBoard = ({ boardId, ...options }: GetBoardProps) => {
  const client = useAuthClient();

  const fetchBoard: QueryFunction<BoardResponse, BoardQueryKey> = async ({
    queryKey: [{ id }],
  }) => {
    const response = await client.get(boardURL.read(id));
    return response.data;
  };

  return useQuery({
    ...options,
    queryKey: boardQueryKeys.item(boardId),
    queryFn: fetchBoard,
    enabled: !!boardId,
    staleTime: 1 * 60 * 1000,
  });
};

export default useGetBoard;
