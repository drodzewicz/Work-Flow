import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

import taskURL from "./url";

type OptionsType = Omit<UseMutationOptions<unknown, AxiosError, string>, "mutationFn">;

const useDeleteTask = (options?: OptionsType) => {
  const client = useAuthClient();

  const mutationFn: MutationFunction<unknown, string> = async (taskId) => {
    const response = await client.delete(taskURL.delete(taskId));
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
  });
};

export default useDeleteTask;
