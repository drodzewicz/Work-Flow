import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation } from "react-query";

import axios from "@/config/api.conf.ts";

import authURL from "./url";

type RegisterPayload = {
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
};

type RegisterResponse = {
  _id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
};

type OptionsType = Omit<
  UseMutationOptions<
    RegisterResponse,
    AxiosError<{ messages: Record<string, string> }>,
    RegisterPayload
  >,
  "mutationFn"
>;

const useRegister = (options: OptionsType) => {
  const mutationFn: MutationFunction<RegisterResponse, RegisterPayload> = async (data) => {
    const response = await axios.post(authURL.register, data);
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
  });
};

export default useRegister;
