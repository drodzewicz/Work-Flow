import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

import columnURL from "./url";

type OptionsType = Omit<UseMutationOptions<Column, AxiosError, string>, "mutationFn">;

type CreateColumnProps = { boardId: string } & OptionsType;

const useCreateColumn = ({ boardId, ...options }: CreateColumnProps) => {
  const client = useAuthClient();

  const mutationFn: MutationFunction<Board, string> = async (name) => {
    const response = await client.post(columnURL.index(boardId), { name });
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
  });
};

export default useCreateColumn;
