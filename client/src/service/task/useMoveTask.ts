import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import useAuthClient from "@/hooks/useClient";

import { taskQueryKeys } from "@/service/task";

import taskURL from "./url";

type MoveTaskPayload = {
  taskId: string;
  source: { columnId: string };
  destination: { columnId: string; rowIndex: number };
};

type OptionsType = Omit<
  UseMutationOptions<unknown, AxiosError<GenericAPIError>, MoveTaskPayload>,
  "mutationFn"
>;

type MoveTaskProps = { boardId: string } & OptionsType;

const useMoveTask = ({ boardId, ...options }: MoveTaskProps) => {
  const queryClient = useQueryClient();
  const client = useAuthClient();

  const mutationFn: MutationFunction<unknown, MoveTaskPayload> = async ({
    taskId,
    destination,
  }) => {
    const response = await client.patch(taskURL.move(taskId), { boardId, ...destination });
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
    onMutate: async ({ taskId, source, destination }) => {
      // Snapshot the previous value
      const previousColumns = structuredClone(
        queryClient.getQueryData<ColumnWithTasks[]>(taskQueryKeys.list(boardId)),
      );

      // Optimistically update to the new value
      queryClient.setQueryData<ColumnWithTasks[]>(taskQueryKeys.list(boardId), (old) => {
        if (!old) {
          return [];
        }
        const sourceColumnIndex = old.findIndex((column) => column._id === source.columnId);
        const destinationColumnIndex = old.findIndex(
          (column) => column._id === destination.columnId,
        );
        const taskIndex = old[sourceColumnIndex].tasks.findIndex((task) => task._id === taskId);
        const [targetTask] = old[sourceColumnIndex].tasks.splice(taskIndex, 1);
        old[destinationColumnIndex].tasks.splice(destination.rowIndex, 0, targetTask);
        return old;
      });

      return { previousColumns };
    },
    onError: (err, newTodo, context) => {
      const errorMessage =
        err.response?.data.message || "There was an issue while trying to move a task";
      toast.error(errorMessage);
      queryClient.setQueryData(taskQueryKeys.list(boardId), context?.previousColumns);
      options?.onError?.(err, newTodo, context);
    },
  });
};

export default useMoveTask;
