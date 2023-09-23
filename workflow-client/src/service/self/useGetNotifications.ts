import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import selfURL from "./url";

const useGetNotifications = () => {
  const client = useAuthClient();
  const notificationsQuery = useQuery<
    AxiosResponse<BoardNotification[]>,
    unknown,
    BoardNotification[]
  >("notifications", () => client.get(selfURL.notifications()), {
    select: (response) => response.data,
  });
  return notificationsQuery;
};

export default useGetNotifications;
