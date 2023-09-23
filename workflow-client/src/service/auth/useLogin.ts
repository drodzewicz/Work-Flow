import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";

import axios from "@/config/api.conf.ts";

import authURL from "./url";

type LoginProps = { onSuccess: (response: AxiosResponse) => void; onError: (err: any) => void };

type LoginPayload = {
  username: string;
  password: string;
};

type LoginResponse = {
  user: User;
  accessToke: string;
};

const useLogin = (props?: LoginProps) => {
  return useMutation<AxiosResponse<LoginResponse>, AxiosError, LoginPayload>(
    (data) => axios.post(authURL.login, data, { withCredentials: true }),
    {
      ...props,
    }
  );
};

export default useLogin;
