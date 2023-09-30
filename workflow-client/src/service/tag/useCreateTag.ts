import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";

import useAuthClient from "@/hooks/useClient";

import tagQueryKeys from "./queryKeys";
import tagURL from "./url";

type CreateTagPayload = {
  name: string;
  key: string;
};

type OptionsType = Omit<UseMutationOptions<Tag, AxiosError, CreateTagPayload>, "mutationFn">;

type CreateTaskProps = { boardId: string } & OptionsType;

const useCreateTag = ({ boardId, ...options }: CreateTaskProps) => {
  const queryClient = useQueryClient();
  const client = useAuthClient();

  const mutationFn: MutationFunction<Tag, CreateTagPayload> = async (data) => {
    const response = await client.post(tagURL.index, { ...data, boardId });
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
    onSuccess: (_data, _var, _context) => {
      queryClient.invalidateQueries(tagQueryKeys.list(boardId));
      options?.onSuccess?.(_data, _var, _context);
    },
  });
};

export default useCreateTag;
