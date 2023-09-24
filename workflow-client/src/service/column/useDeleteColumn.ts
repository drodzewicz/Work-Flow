import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

import columnURL from "./url";

type OptionsType = Omit<UseMutationOptions<unknown, AxiosError, string>, "mutationFn">;

type DeleteColumnProps = { boardId: string } & OptionsType;

const useDeleteColumn = ({ boardId, ...options }: DeleteColumnProps) => {
  const client = useAuthClient();

  const mutationFn: MutationFunction<unknown, string> = async (columnId) => {
    const response = await client.delete(columnURL.delete(boardId, columnId));
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
  });
};

export default useDeleteColumn;
