import { AxiosError } from "axios";
import { QueryFunction, UseQueryOptions, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import selfQueryKeys from "./queryKeys";
import selfURL from "./url";

type NotificationsQueryKey = ReturnType<(typeof selfQueryKeys)["notifications"]>;

type OptionsType = Omit<
  UseQueryOptions<BoardNotification[], AxiosError, BoardNotification[], NotificationsQueryKey>,
  "queryKey" | "queryFn"
>;

const useGetNotifications = (options?: OptionsType) => {
  const client = useAuthClient();

  const fetchNotifications: QueryFunction<
    BoardNotification[],
    NotificationsQueryKey
  > = async () => {
    const response = await client.get(selfURL.notifications());
    return response.data;
  };

  return useQuery({
    ...options,
    queryKey: selfQueryKeys.notifications(),
    queryFn: fetchNotifications,
    refetchInterval: 60 * 1000,
  });
};

export default useGetNotifications;
