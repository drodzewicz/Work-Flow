import { AxiosError } from "axios";
import { QueryFunction, UseQueryOptions, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import taskQueryKeys from "./queryKeys";
import taskURL from "./url";

type TaskQueryKey = ReturnType<(typeof taskQueryKeys)["list"]>;

type GetTasksResponse = ColumnWithTasks | ColumnWithTasks[];

type OptionsType = Omit<
  UseQueryOptions<GetTasksResponse, AxiosError, GetTasksResponse, TaskQueryKey>,
  "queryKey" | "queryFn"
>;

type GetColumnTasksProp = {
  boardId: string;
  columnId?: string;
} & OptionsType;

const useGetTasks = ({ boardId, columnId, ...options }: GetColumnTasksProp) => {
  const client = useAuthClient();

  const fetchTasks: QueryFunction<GetTasksResponse, TaskQueryKey> = async ({
    queryKey: [{ listId }],
  }) => {
    const response = await client.get(taskURL.index, { params: listId });
    return response.data;
  };

  return useQuery({
    ...options,
    queryKey: taskQueryKeys.list(boardId, columnId),
    queryFn: fetchTasks,
    // staleTime: 1 * 60 * 1000,
  });
};

export default useGetTasks;
