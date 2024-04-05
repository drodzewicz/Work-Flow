import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import useAuthClient from "@/hooks/useClient";

import { taskQueryKeys } from "@/service/task";

import columnURL from "./url";

type OptionsType = Omit<
    UseMutationOptions<Column, AxiosError<GenericAPIError>, string>,
    "mutationFn"
>;

type CreateColumnProps = { boardId: string } & OptionsType;

const useCreateColumn = ({ boardId, ...options }: CreateColumnProps) => {
    const queryClient = useQueryClient();
    const client = useAuthClient();

    const mutationFn: MutationFunction<Column, string> = async (name) => {
        const response = await client.post(columnURL.index(boardId), { name });
        return response.data;
    };

    return useMutation({
        ...options,
        mutationFn,
        onSuccess: (data, _var, _context) => {
            toast.success(`Column "${data.name}" created`);

            queryClient.setQueryData<ColumnWithTasks[]>(taskQueryKeys.list(boardId), (oldData) => {
                const columnList = oldData ?? [];
                columnList.push({ ...data, tasks: [] });
                return columnList;
            });

            options?.onSuccess?.(data, _var, _context);
        },
        onError: (data, _var, _context) => {
            const errorMessage =
                data.response?.data.message || "There was an issue while trying to create a column";
            toast.error(errorMessage);
            options?.onError?.(data, _var, _context);
        },
    });
};

export default useCreateColumn;
