import { AxiosError } from "axios";
import { QueryFunction, UseQueryOptions, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import taskQueryKeys from "./queryKeys";
import taskURL from "./url";

type TaskQueryKey = ReturnType<(typeof taskQueryKeys)["list"]>;

type OptionsType = Omit<
  UseQueryOptions<ColumnWithTasks[], AxiosError, ColumnWithTasks[], TaskQueryKey>,
  "queryKey" | "queryFn"
>;

type GetColumnTasksProp = {
  boardId: string;
} & OptionsType;

const useGetTasks = ({ boardId, ...options }: GetColumnTasksProp) => {
  const client = useAuthClient();

  const fetchTasks: QueryFunction<ColumnWithTasks[], TaskQueryKey> = async ({
    queryKey: [{ listId }],
  }) => {
    const response = await client.get(taskURL.index, { params: listId });
    return response.data;
  };

  return useQuery({
    ...options,
    queryKey: taskQueryKeys.list(boardId),
    queryFn: fetchTasks,
    staleTime: 5 * 60 * 1000,
  });
};

export default useGetTasks;
