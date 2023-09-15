import { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";

import useAuthClient from "@/hooks/useClient";

const useDeleteTask = () => {
  const client = useAuthClient();
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, unknown, string>(
    (taskId: string) => client.delete(`/tasks/${taskId}`),
    {
      onSuccess: () => {
        // queryClient.invalidateQueries("notifications");
      },
    }
  );
};

export default useDeleteTask;
