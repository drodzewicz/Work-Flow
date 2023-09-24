import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation } from "react-query";

import axios from "@/config/api.conf.ts";

import authURL from "./url";

type OptionsType = Omit<UseMutationOptions<unknown, AxiosError>, "mutationFn">;

const useLogout = (options: OptionsType) => {
  const mutationFn: MutationFunction = async () => {
    const response = await axios.post(authURL.logout, {}, { withCredentials: true });
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
  });
};

export default useLogout;
