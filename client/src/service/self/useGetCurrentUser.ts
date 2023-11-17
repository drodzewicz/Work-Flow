import { AxiosError } from "axios";
import { QueryFunction, UseQueryOptions, useQuery } from "react-query";

import useClient from "@/hooks/useClient";

import selfQueryKeys from "./queryKeys";
import selfURL from "./url";

type CurrentUserQueryKey = ReturnType<(typeof selfQueryKeys)["currentUser"]>;

type OptionsType = Omit<
  UseQueryOptions<User, AxiosError, User, CurrentUserQueryKey>,
  "queryKey" | "queryFn"
>;

const useGetCurrentUser = (options?: OptionsType) => {
  const client = useClient();

  const fetchCurrentUser: QueryFunction<User, CurrentUserQueryKey> = async () => {
    const response = await client.get(selfURL.index);
    return response.data;
  };

  return useQuery({
    ...options,
    queryKey: selfQueryKeys.currentUser(),
    queryFn: fetchCurrentUser,
    staleTime: 6 * 60 * 1000,
  });
};

export default useGetCurrentUser;
