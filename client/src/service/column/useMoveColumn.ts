import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import useAuthClient from "@/hooks/useClient";

import { taskQueryKeys } from "@/service/task";

import columnURL from "./url";

type MoveColumnPayload = { columnId: string; destination: number };

type OptionsType = Omit<
  UseMutationOptions<unknown, AxiosError<GenericAPIError>, MoveColumnPayload>,
  "mutationFn"
>;

type MoveColumnProps = { boardId: string } & OptionsType;

const useMoveColumn = ({ boardId, ...options }: MoveColumnProps) => {
  const queryClient = useQueryClient();
  const client = useAuthClient();

  const mutationFn: MutationFunction<unknown, MoveColumnPayload> = async ({
    columnId,
    destination,
  }) => {
    const response = await client.patch(columnURL.move(boardId, columnId), { index: destination });
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
    onMutate: async ({ columnId, destination }) => {
      // Snapshot the previous value
      const previousColumns = structuredClone(
        queryClient.getQueryData<ColumnWithTasks[]>(taskQueryKeys.list(boardId)),
      );

      // Optimistically update to the new value
      queryClient.setQueryData<ColumnWithTasks[]>(taskQueryKeys.list(boardId), (old) => {
        if (!old) {
          return [];
        }
        const columnIndex = old.findIndex((column) => column._id === columnId);
        const [targetColumn] = old.splice(columnIndex, 1);
        old.splice(destination, 0, targetColumn);
        return old;
      });

      return { previousColumns };
    },
    onError: (err, errorData, context) => {
      const errorMessage =
        err.response?.data.message || "There was an issue while trying to move a column";
      toast.error(errorMessage);

      queryClient.setQueryData(taskQueryKeys.list(boardId), context?.previousColumns);
      options?.onError?.(err, errorData, context);
    },
  });
};

export default useMoveColumn;
