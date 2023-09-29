import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";

import useAuthClient from "@/hooks/useClient";

import { taskQueryKeys } from "../task";
import columnURL from "./url";

type OptionsType = Omit<UseMutationOptions<unknown, AxiosError, string>, "mutationFn">;

type DeleteColumnProps = { boardId: string } & OptionsType;

const useDeleteColumn = ({ boardId, ...options }: DeleteColumnProps) => {
  const queryClient = useQueryClient();
  const client = useAuthClient();

  const mutationFn: MutationFunction<unknown, string> = async (columnId) => {
    const response = await client.delete(columnURL.delete(boardId, columnId));
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
    onSuccess: (_data, _var, _context) => {
      queryClient.setQueryData<ColumnWithTasks[]>(taskQueryKeys.list(boardId), (oldData) => {
        const columnList = oldData ?? [];
        return columnList.filter((column) => column._id !== _var);
      });
      options?.onSuccess?.(_data, _var, _context);
    },
  });
};

export default useDeleteColumn;
