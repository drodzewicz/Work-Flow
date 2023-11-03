import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import useAuthClient from "@/hooks/useClient";

import taskQueryKeys from "../task/queryKeys";
import columnURL from "./url";

type OptionsType = Omit<
  UseMutationOptions<unknown, AxiosError<GenericAPIError>, string>,
  "mutationFn"
>;

type UpdateColumnProps = { boardId: string; columnId: string } & OptionsType;

const useUpdateColumn = ({ boardId, columnId, ...options }: UpdateColumnProps) => {
  const queryClient = useQueryClient();
  const client = useAuthClient();

  const mutationFn: MutationFunction<unknown, string> = async (name) => {
    const response = await client.put(columnURL.update(boardId, columnId), { name });
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
    onSuccess: (data, _var, _context) => {
      toast.success("Column updated");

      options?.onSuccess?.(data, _var, _context);
    },
    onMutate: async (name) => {
      // Snapshot the previous value
      const previousColumns = structuredClone(
        queryClient.getQueryData<ColumnWithTasks[]>(taskQueryKeys.list(boardId))
      );

      // Optimistically update to the new value
      queryClient.setQueryData<ColumnWithTasks[]>(taskQueryKeys.list(boardId), (old) => {
        if (!old) {
          return [];
        }
        return old.map((column) => (column._id === columnId ? { ...column, name } : column));
      });

      return { previousColumns };
    },
    onError: (err, newTodo, context) => {
      const errorMessage =
        err.response?.data.message || "There was an issue while trying to update a column";

      toast.error(errorMessage);
      queryClient.setQueryData(taskQueryKeys.list(boardId), (context as any)?.previousColumns);
      options?.onError?.(err, newTodo, context);
    },
  });
};

export default useUpdateColumn;
