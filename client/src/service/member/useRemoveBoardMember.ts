import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import useAuthClient from "@/hooks/useClient";

import memberQueryKeys from "./queryKeys";
import memberURL from "./url";

type OptionsType = Omit<
    UseMutationOptions<unknown, AxiosError<GenericAPIError>, string>,
    "mutationFn"
>;

type RemoveBoardProps = { boardId: string } & OptionsType;

const useRemoveBoardMember = ({ boardId, ...options }: RemoveBoardProps) => {
    const queryClient = useQueryClient();
    const client = useAuthClient();

    const mutationFn: MutationFunction<unknown, string> = async (userId) => {
        const response = await client.delete(memberURL.remove(boardId, userId));
        return response.data;
    };

    return useMutation({
        ...options,
        mutationFn,
        onSuccess: (_data, _var, _context) => {
            toast.success("Removed user from the board");

            queryClient.invalidateQueries(memberQueryKeys.list(boardId));
            options?.onSuccess?.(_data, _var, _context);
        },
        onError: (data, _var, _context) => {
            const errorMessage =
                data.response?.data.message ||
                "There was an issue while trying to remove a user from the board";
            toast.error(errorMessage);
            options?.onError?.(data, _var, _context);
        },
    });
};

export default useRemoveBoardMember;
