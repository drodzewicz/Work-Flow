import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

import columnURL from "./url";

type OptionsType = Omit<UseMutationOptions<unknown, AxiosError, string>, "mutationFn">;

type UpdateColumnProps = { boardId: string; columnId: string } & OptionsType;

const useUpdateColumn = ({ boardId, columnId, ...options }: UpdateColumnProps) => {
  const client = useAuthClient();

  const mutationFn: MutationFunction<unknown, string> = async (name) => {
    const response = await client.put(columnURL.update(boardId, columnId), { name });
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
  });
};

export default useUpdateColumn;
