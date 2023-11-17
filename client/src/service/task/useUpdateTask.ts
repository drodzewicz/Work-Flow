import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import useAuthClient from "@/hooks/useClient";

import taskQueryKeys from "./queryKeys";
import taskURL from "./url";

type UpdateTaskPayload = {
  title: string;
  description: string;
  columnId?: string;
  assignees?: string[];
};

type OptionsType = Omit<
  UseMutationOptions<Task, AxiosError<GenericAPIError>, UpdateTaskPayload>,
  "mutationFn"
>;

type UpdateTaskProps = { boardId: string, taskId: string  } & OptionsType;

const useUpdateTask = ({ boardId, taskId, ...options }: UpdateTaskProps) => {
  const queryClient = useQueryClient();
  const client = useAuthClient();

  const mutationFn: MutationFunction<Task, UpdateTaskPayload> = async (data) => {
    const response = await client.put(taskURL.update(taskId), data);
    return response.data;
  };

  return useMutation({
    ...options,
    mutationFn,
    onSuccess: (_data, _var, _context) => {
      toast.success("Task updated");
      queryClient.invalidateQueries(taskQueryKeys.all);
      options?.onSuccess?.(_data, _var, _context);
    },
    onError: (err, _var, _context) => {
      const errorMessage =
        err.response?.data.message || "There was an issue while trying to update a task";
      toast.error(errorMessage);
      options?.onError?.(err, _var, _context);
    },
  });
};

export default useUpdateTask;
