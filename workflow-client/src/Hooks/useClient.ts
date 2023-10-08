import { useEffect } from "react";

import axios from "@/config/api.conf.ts";

import useAuth from "@/hooks/useAuth";
import useRefreshToken from "@/hooks/useRefreshToken";

const useAuthClient = () => {
  const { isRefreshing, refresh } = useRefreshToken();
  const { token, logout } = useAuth();
  let failedQueue: ((value: string | null) => unknown)[] = [];

  const processQueue = (token: string | null) => {
    failedQueue.forEach((resolve) => {
      resolve(token);
    });

    failedQueue = [];
  };

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"] && token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error?.response?.status === 403) {
          throw new Response("Not Found", { status: 403 });
        }

        /** Ignore other errors than unauthorized:
         * below logic should only be applied to 401 errors
         */
        if (error?.response?.status !== 401) {
          return Promise.reject(error);
        }

        /** Ignore login url:
         * We dont want to send a refresh token request of the login is bad
         */
        if (originalRequest.url === "/auth/login") {
          return Promise.reject(error);
        }

        if (originalRequest._retry || originalRequest.url === "/auth/refreshToken") {
          logout();
        }

        /** Catch unauthorized requests:
         * Side note:
         * ignore refresh token endpoint to avoid infinite loop
         * since if invalid token is sent to refresh route it will return 401
         */
        if (originalRequest.url !== "/auth/refreshToken" && !originalRequest._retry) {
          /** Prevent sending multiple refresh tokens:
           * If request for refresh token is currently in progrss
           * then add all of the request to the que
           * and resolve them once the refresh token is returned
           */
          if (isRefreshing.current) {
            /** For unauthorized request put their resolvers in a que */
            return new Promise(function (resolve) {
              failedQueue.push(resolve);
            })
              .then((token) => {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
                return axios(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          originalRequest._retry = true;

          const token = await refresh();
          originalRequest.headers.Authorization = `Bearer ${token}`;
          processQueue(token);

          return axios(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    };
  }, [token, refresh]);

  return axios;
};

export default useAuthClient;
