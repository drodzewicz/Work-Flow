import { AxiosError, AxiosResponse } from "axios";
import { QueryFunctionContext, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import taskQueryKeys from "./queryKeys";
import taskURL from "./url";

type GetColumnTasksProp = {
  boardId: string;
  columnId?: string;
  onSuccess?: (data: ColumnWithTasks | ColumnWithTasks[]) => void;
};

type TaskQueryKey = ReturnType<(typeof taskQueryKeys)["list"]>;

const useGetTasks = ({ boardId, columnId, onSuccess }: GetColumnTasksProp) => {
  const client = useAuthClient();

  const fetchTasks = async ({ queryKey: [{ listId }] }: QueryFunctionContext<TaskQueryKey>) => {
    const response = await client.get(taskURL.index, { params: listId });
    return response.data;
  };

  return useQuery<
    ColumnWithTasks | ColumnWithTasks[],
    AxiosError,
    ColumnWithTasks | ColumnWithTasks[],
    TaskQueryKey
  >({
    queryKey: taskQueryKeys.list(boardId, columnId),
    queryFn: fetchTasks,
    onSuccess,
  });
};

export default useGetTasks;
