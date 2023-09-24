import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

import selfURL from "./url";

type OptionsType = Omit<UseMutationOptions<unknown, AxiosError, string>, "mutationFn">;

const useTogglePinBoard = (options: OptionsType) => {
  const client = useAuthClient();

  const mutationFn: MutationFunction<Board, string> = async (boardId) => {
    const response = await client.put(selfURL.togglePin(boardId));
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
  });
};

export default useTogglePinBoard;
