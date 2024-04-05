import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import useAuthClient from "@/hooks/useClient";

import { selfQueryKeys } from "@/service/self";

import boardURL from "./url";

type OptionsType = Omit<
    UseMutationOptions<unknown, AxiosError<GenericAPIError>, string>,
    "mutationFn"
>;

const useDeleteBoard = (options: OptionsType) => {
    const queryClient = useQueryClient();
    const client = useAuthClient();

    const mutationFn: MutationFunction<unknown, string> = async (boardId) => {
        const response = await client.delete(boardURL.delete(boardId));
        return response.data;
    };

    return useMutation({
        ...options,
        mutationFn,
        onSuccess: (_data, _var, _context) => {
            toast.success("Board deleted successfully");
            queryClient.invalidateQueries(selfQueryKeys.boards());
            options?.onSuccess?.(_data, _var, _context);
        },
        onError: (data, _var, _context) => {
            const errorMessage =
                data.response?.data.message ||
                "There was an issue while trying to delete this board";
            toast.error(errorMessage);
            options?.onError?.(data, _var, _context);
        },
    });
};

export default useDeleteBoard;
