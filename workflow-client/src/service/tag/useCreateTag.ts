import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import useAuthClient from "@/hooks/useClient";

import tagQueryKeys from "./queryKeys";
import tagURL from "./url";

type CreateTagPayload = {
  name: string;
  key: string;
};

type OptionsType = Omit<
  UseMutationOptions<Tag, AxiosError<GenericAPIError>, CreateTagPayload>,
  "mutationFn"
>;

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
      toast.success("Tag created");

      queryClient.invalidateQueries(tagQueryKeys.list(boardId));
      options?.onSuccess?.(_data, _var, _context);
    },
    onError: (err, _var, _context) => {
      const errorMessage =
        err.response?.data.message || "There was an issue while trying to create a tag";
      toast.error(errorMessage);
      options?.onError?.(err, _var, _context);
    },
  });
};

export default useCreateTag;
