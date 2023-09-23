import { AxiosError } from "axios";
import { QueryFunctionContext, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import taskQueryKeys from "./queryKeys";
import taskURL from "./url";

type TaskQueryKey = ReturnType<(typeof taskQueryKeys)["item"]>;

type GetTaskDetailsProps = { taskId: string };

const useGetTaskDetails = ({ taskId }: GetTaskDetailsProps) => {
  const client = useAuthClient();

  const fetchTask = async ({ queryKey: [{ id }] }: QueryFunctionContext<TaskQueryKey>) => {
    const response = await client.get(taskURL.read(id));
    return response.data;
  };

  return useQuery<Task, AxiosError, Task, TaskQueryKey>({
    queryKey: taskQueryKeys.item(taskId),
    queryFn: fetchTask,
  });
};

export default useGetTaskDetails;
