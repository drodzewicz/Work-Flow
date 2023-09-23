import { AxiosError } from "axios";
import { useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import selfQueryKeys from "./queryKeys";
import selfURL from "./url";

const useGetNotifications = () => {
  const client = useAuthClient();

  const fetchNotifications = async () => {
    const response = await client.get(selfURL.notifications());
    return response.data;
  };

  return useQuery<BoardNotification[], AxiosError, BoardNotification[]>({
    queryKey: selfQueryKeys.notifications(),
    queryFn: fetchNotifications,
  });
};

export default useGetNotifications;
