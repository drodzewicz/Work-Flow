import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

import boardURL from "./url";

type OptionsType = Omit<UseMutationOptions<unknown, AxiosError, string>, "mutationFn">;

const useLeaveBoard = (options: OptionsType) => {
  const client = useAuthClient();

  const mutationFn: MutationFunction<unknown, string> = async (boardId) => {
    const response = await client.patch(boardURL.leave(boardId));
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
  });
};

export default useLeaveBoard;
