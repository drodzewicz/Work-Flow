import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import useAuthClient from "@/hooks/useClient";

import selfQueryKeys from "./queryKeys";
import selfURL from "./url";

type OptionsType = Omit<
  UseMutationOptions<unknown, AxiosError<GenericAPIError>, string>,
  "mutationFn"
>;

const useUpdateUserAvatar = (options?: OptionsType) => {
  const queryClient = useQueryClient();
  const client = useAuthClient();

  const mutationFn: MutationFunction<unknown, string> = async (image) => {
    const response = await client.patch(selfURL.avatar(), { image });
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
    onSuccess: (_data, _var, _context) => {
      toast.success("Updated avatar");

      queryClient.invalidateQueries(selfQueryKeys.currentUser());
      options?.onSuccess?.(_data, _var, _context);
    },
    onError: (err, _var, _context) => {
      const errorMessage =
        err.response?.data.message || "There was an issue while trying to update an avatar";
      toast.error(errorMessage);
      options?.onError?.(err, _var, _context);
    },
  });
};

export default useUpdateUserAvatar;
