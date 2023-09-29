import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";

import useAuthClient from "@/hooks/useClient";

import { taskQueryKeys } from "@/service/task";

import columnURL from "./url";

type OptionsType = Omit<UseMutationOptions<Column, AxiosError, string>, "mutationFn">;

type CreateColumnProps = { boardId: string } & OptionsType;

const useCreateColumn = ({ boardId, ...options }: CreateColumnProps) => {
  const queryClient = useQueryClient();
  const client = useAuthClient();

  const mutationFn: MutationFunction<Column, string> = async (name) => {
    const response = await client.post(columnURL.index(boardId), { name });
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
    onSuccess: (_data, _var, _context) => {
      queryClient.setQueryData<ColumnWithTasks[]>(taskQueryKeys.list(boardId), (oldData) => {
        const columnList = oldData ?? []
        columnList.push({ ..._data, tasks: [] })
        return columnList;
      });
      options?.onSuccess?.(_data, _var, _context);
    },
  });
};

export default useCreateColumn;
