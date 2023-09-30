import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";

import useAuthClient from "@/hooks/useClient";

import tagQueryKeys from "./queryKeys";
import tagURL from "./url";

type UpdateTagPayload = {
  tagId: string;
  name: string;
  key: string;
};

type OptionsType = Omit<UseMutationOptions<Tag, AxiosError, UpdateTagPayload>, "mutationFn">;

const useUpdateTag = (options?: OptionsType) => {
  const queryClient = useQueryClient();
  const client = useAuthClient();

  const mutationFn: MutationFunction<Tag, UpdateTagPayload> = async ({ tagId, ...data }) => {
    const response = await client.put(tagURL.update(tagId), { ...data });
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
    onSuccess: (_data, _var, _context) => {
      queryClient.invalidateQueries(tagQueryKeys.all);
      options?.onSuccess?.(_data, _var, _context);
    },
  });
};

export default useUpdateTag;
