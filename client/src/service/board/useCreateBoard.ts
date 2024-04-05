import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import useAuthClient from "@/hooks/useClient";

import { selfQueryKeys } from "@/service/self";

import boardURL from "./url";

type BoardPayload = {
    name: string;
    description?: string;
};

type OptionsType = Omit<
    UseMutationOptions<Board, AxiosError<GenericAPIError>, BoardPayload>,
    "mutationFn"
>;

const useCreateBoard = (options: OptionsType) => {
    const client = useAuthClient();
    const queryClient = useQueryClient();

    const mutationFn: MutationFunction<Board, BoardPayload> = async (data) => {
        const response = await client.post(boardURL.index, data);
        return response.data;
    };

    return useMutation({
        ...options,
        mutationFn,
        onSuccess: (_data, _var, _context) => {
            toast.success("Board created successfully");
            queryClient.invalidateQueries(selfQueryKeys.boards());
            options?.onSuccess?.(_data, _var, _context);
        },
        onError: (data, _var, _context) => {
            const errorMessage =
                data.response?.data.message ||
                "There was an issue while trying to create a new board";
            toast.error(errorMessage);
            options?.onError?.(data, _var, _context);
        },
    });
};

export default useCreateBoard;
