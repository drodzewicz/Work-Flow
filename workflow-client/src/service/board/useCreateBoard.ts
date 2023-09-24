import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

import boardURL from "./url";

type BoardPayload = {
  name: string;
  description?: string;
};

type OptionsType = Omit<UseMutationOptions<Board, AxiosError, BoardPayload>, "mutationFn">;

const useCreateBoard = (options: OptionsType) => {
  const client = useAuthClient();

  const mutationFn: MutationFunction<Board, BoardPayload> = async (data) => {
    const response = await client.post(boardURL.index, data);
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
  });
};

export default useCreateBoard;
