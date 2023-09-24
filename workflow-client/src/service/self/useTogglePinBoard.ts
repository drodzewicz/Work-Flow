import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";

import useAuthClient from "@/hooks/useClient";

import selfQueryKeys from "./queryKeys";
import selfURL from "./url";

type OptionsType = Omit<UseMutationOptions<unknown, AxiosError, string>, "mutationFn">;

const useTogglePinBoard = (options: OptionsType) => {
  const queryClient = useQueryClient();
  const client = useAuthClient();

  const mutationFn: MutationFunction<Board, string> = async (boardId) => {
    const response = await client.put(selfURL.togglePin(boardId));
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
    onSuccess: (_data, _var, _context) => {
      queryClient.invalidateQueries(selfQueryKeys.boards());
      options?.onSuccess?.(_data, _var, _context);
    },
  });
};

export default useTogglePinBoard;
