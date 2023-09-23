import { useMutation } from "react-query";

import axios from "@/config/api.conf.ts";

import authURL from "./url";

type LogoutProps = { onSuccess: () => void };

const useLogout = (props?: LogoutProps) => {
  return useMutation(() => axios.post(authURL.logout, {}, { withCredentials: true }), {
    onSuccess: props?.onSuccess,
  });
};

export default useLogout;
