import { useMutation } from "react-query";

import axios from "@/config/api.conf.ts";

type LogoutProps = { onSuccess: () => void };

const useLogout = (props?: LogoutProps) => {
  return useMutation(() => axios.post("/auth/logout", {}, { withCredentials: true }), {
    onSuccess: props?.onSuccess,
  });
};

export default useLogout;
