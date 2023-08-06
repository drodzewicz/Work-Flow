import { useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

const useGetNotifications = () => {
  const client = useAuthClient();
  const notificationsQuery = useQuery("notifications", () => client.get("/self/notifications"), {
    select: (response) => response.data,
  });
  return notificationsQuery;
};

export default useGetNotifications;
