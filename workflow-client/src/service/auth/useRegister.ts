import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";

import axios from "@/config/api.conf.ts";

import authURL from "./url";

type RegisterProps = { onSuccess: (response: AxiosResponse) => void; onError: (err: any) => void };

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

const useRegister = (props?: RegisterProps) => {
  return useMutation<AxiosResponse<RegisterResponse>, AxiosError, RegisterPayload>(
    (data) => axios.post(authURL.register, data),
    {
      ...props,
    }
  );
};

export default useRegister;
