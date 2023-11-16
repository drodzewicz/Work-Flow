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

const useTogglePinBoard = (options?: OptionsType) => {
  const queryClient = useQueryClient();
  const client = useAuthClient();

  const mutationFn: MutationFunction<{ message: string }, string> = async (boardId) => {
    const response = await client.put(selfURL.togglePin(boardId));
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
    onSuccess: (data, _var, _context) => {
      queryClient.invalidateQueries(selfQueryKeys.boards());
      options?.onSuccess?.(data, _var, _context);
    },
    onError: (err, _var, _context) => {
      const errorMessage =
        err.response?.data.message || "There was an issue while trying to create a tag";
      toast.error(errorMessage);
      options?.onError?.(err, _var, _context);
    },
  });
};

export default useTogglePinBoard;
