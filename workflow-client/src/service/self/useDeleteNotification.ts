import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";

import useAuthClient from "@/hooks/useClient";

import selfURL from "./url";

const useDeleteNotification = () => {
  const client = useAuthClient();
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, unknown, string>(
    (notificationId: string) => client.delete(selfURL.deleteNotification(notificationId)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("notifications");
      },
    }
  );
};

export default useDeleteNotification;
