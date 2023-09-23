import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import taskURL from "./url";

type GetTaskDetailsProps = { taskId: string };

const useGetTaskDetails = ({ taskId }: GetTaskDetailsProps) => {
  const client = useAuthClient();

  return useQuery<AxiosResponse<Task>, unknown, Task>(
    ["task-details", taskId],
    () => client.get(taskURL.read(taskId)),
    {
      select: (response) => response.data,
    }
  );
};

export default useGetTaskDetails;
