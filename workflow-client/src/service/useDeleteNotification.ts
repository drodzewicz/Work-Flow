import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";

import useAuthClient from "@/hooks/useClient";

const useDeleteNotification = () => {
  const client = useAuthClient();
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, unknown, string>(
    (notificationId: string) => client.delete(`/self/notifications/${notificationId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("notifications");
      },
    }
  );
};

export default useDeleteNotification;
