import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

type CreateTaskProps = { boardId: string };

type CreateTaskPayload = {
  title: string;
  description: string;
  columnId?: string;
  assignees?: string[];
};

const useCreateTask = ({ boardId }: CreateTaskProps) => {
  const client = useAuthClient();
  return useMutation<AxiosResponse<Task>, unknown, CreateTaskPayload>((data) =>
    client.post("/tasks", { ...data, boardId })
  );
};

export default useCreateTask;
