import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation } from "react-query";

import useAuthClient from "@/hooks/useClient";

import taskURL from "./url";

type CreateTaskPayload = {
  title: string;
  description: string;
  columnId?: string;
  assignees?: string[];
};

type OptionsType = Omit<UseMutationOptions<Task, AxiosError, CreateTaskPayload>, "mutationFn">;

type CreateTaskProps = { boardId: string } & OptionsType;

const useCreateTask = ({ boardId, ...options }: CreateTaskProps) => {
  const client = useAuthClient();

  const mutationFn: MutationFunction<Task, CreateTaskPayload> = async (data) => {
    const response = await client.post(taskURL.index, { ...data, boardId });
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
  });
};

export default useCreateTask;
