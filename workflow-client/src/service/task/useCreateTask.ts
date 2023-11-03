import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import useAuthClient from "@/hooks/useClient";

import taskQueryKeys from "./queryKeys";
import taskURL from "./url";

type CreateTaskPayload = {
  title: string;
  description: string;
  columnId?: string;
  assignees?: string[];
};

type OptionsType = Omit<
  UseMutationOptions<Task, AxiosError<GenericAPIError>, CreateTaskPayload>,
  "mutationFn"
>;

type CreateTaskProps = { boardId: string } & OptionsType;

const useCreateTask = ({ boardId, ...options }: CreateTaskProps) => {
  const queryClient = useQueryClient();
  const client = useAuthClient();

  const mutationFn: MutationFunction<Task, CreateTaskPayload> = async (data) => {
    const response = await client.post(taskURL.index, { ...data, boardId });
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
    onSuccess: (_data, _var, _context) => {
      toast.success("Created new task");
      queryClient.invalidateQueries(taskQueryKeys.list(boardId));
      options?.onSuccess?.(_data, _var, _context);
    },
    onError: (err, _var, _context) => {
      const errorMessage =
        err.response?.data.message || "There was an issue while trying to create a task";
      toast.error(errorMessage);
      options?.onError?.(err, _var, _context);
    },
  });
};

export default useCreateTask;
