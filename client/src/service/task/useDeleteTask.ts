import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation } from "react-query";
import { toast } from "react-toastify";

import useAuthClient from "@/hooks/useClient";

import taskURL from "./url";

type OptionsType = Omit<
    UseMutationOptions<unknown, AxiosError<GenericAPIError>, string>,
    "mutationFn"
>;

const useDeleteTask = (options?: OptionsType) => {
    const client = useAuthClient();

    const mutationFn: MutationFunction<unknown, string> = async (taskId) => {
        const response = await client.delete(taskURL.delete(taskId));
        return response.data;
    };

    return useMutation({
        ...options,
        mutationFn,
        onSuccess: (_data, _var, _context) => {
            toast.success("Task deleted");
            options?.onSuccess?.(_data, _var, _context);
        },
        onError: (err, _var, _context) => {
            const errorMessage =
                err.response?.data.message || "There was an issue while trying to delete a column";
            toast.error(errorMessage);
            options?.onError?.(err, _var, _context);
        },
    });
};

export default useDeleteTask;
