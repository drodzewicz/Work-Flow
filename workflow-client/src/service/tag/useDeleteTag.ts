import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import useAuthClient from "@/hooks/useClient";

import tagQueryKeys from "./queryKeys";
import tagURL from "./url";

type OptionsType = Omit<
  UseMutationOptions<unknown, AxiosError<GenericAPIError>, string>,
  "mutationFn"
>;

const useDeleteTask = (options?: OptionsType) => {
  const queryClient = useQueryClient();
  const client = useAuthClient();

  const mutationFn: MutationFunction<unknown, string> = async (tagId) => {
    const response = await client.delete(tagURL.delete(tagId));
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
    onSuccess: (_data, _var, _context) => {
      toast.success("Tag deleted");

      queryClient.invalidateQueries(tagQueryKeys.all);
      options?.onSuccess?.(_data, _var, _context);
    },
    onError: (err, _var, _context) => {
      const errorMessage =
        err.response?.data.message || "There was an issue while trying to delete a tag";
      toast.error(errorMessage);
      options?.onError?.(err, _var, _context);
    },
  });
};

export default useDeleteTask;
