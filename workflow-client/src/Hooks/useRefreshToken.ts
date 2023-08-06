import { useRef } from "react";

import axios, { authAxios } from "@/config/api.conf.ts";

import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { user, login } = useAuth();
  const isRefreshing = useRef<boolean>(false);

  const refresh = async () => {
    isRefreshing.current = true;
    const response = await axios.get("/auth/refreshToken", { withCredentials: true });
    isRefreshing.current = false;

    login({ token: response.data.accessToken, user });
    return response.data.accessToken;
  };
  return { isRefreshing, refresh };
};

export default useRefreshToken;
