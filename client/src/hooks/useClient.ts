import { useEffect } from "react";

import { AxiosError } from "axios";

import axios from "@/service/utils/client.ts";

import useAuth from "@/hooks/useAuth";
import useRefreshToken from "@/hooks/useRefreshToken";

const useAuthClient = () => {
  const { isRefreshing, refresh } = useRefreshToken();
  const { token, logout } = useAuth();
  let failedQueue: { reject: (error: AxiosError) => void; resolve: (token?: string) => void }[] =
    [];

  const processQueue = ({ token, error }: { token?: string; error?: AxiosError }) => {
    failedQueue.forEach(({ reject, resolve }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
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
            return new Promise(function (resolve, reject) {
              failedQueue.push({ resolve, reject });
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
          processQueue({ token });

          return axios(originalRequest);
        }

        /** if request fail on retry then fail all requests in the que and logout user */
        processQueue({ error });
        logout();
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

export { useAuthClient };

export default useAuthClient;
