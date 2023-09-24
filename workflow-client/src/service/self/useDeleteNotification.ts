import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

import selfURL from "./url";

type OptionsType = Omit<UseMutationOptions<unknown, AxiosError, string>, "mutationFn">;

const useDeleteNotification = (options?: OptionsType) => {
  const client = useAuthClient();

  const mutationFn: MutationFunction<unknown, string> = async (notificationId) => {
    const response = await client.delete(selfURL.deleteNotification(notificationId));
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
  });
};

export default useDeleteNotification;
