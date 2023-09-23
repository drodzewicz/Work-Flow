import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

type GetTaskDetailsProps = { taskId: string };

const useGetTaskDetails = (props: GetTaskDetailsProps) => {
  const client = useAuthClient();

  return useQuery<AxiosResponse<Task>, unknown, Task>(
    ["task-details", props.taskId],
    () => client.get(`/tasks/${props.taskId}`),
    {
      select: (response) => response.data,
      
    }
  );
};

export default useGetTaskDetails;
