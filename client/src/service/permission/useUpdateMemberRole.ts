import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation } from "react-query";
import { toast } from "react-toastify";

import useAuthClient from "@/hooks/useClient";

import permissionURL from "./url";

type UpdateMemberRolePayload = { userId: string; role: string };

type OptionsType = Omit<
    UseMutationOptions<Board, AxiosError<GenericAPIError>, UpdateMemberRolePayload>,
    "mutationFn"
>;

type UpdateMemberRoleProps = { boardId: string } & OptionsType;

const useUpdateMemberRole = ({ boardId, ...options }: UpdateMemberRoleProps) => {
    const client = useAuthClient();

    const mutationFn: MutationFunction<Board, UpdateMemberRolePayload> = async ({
        userId,
        role,
    }) => {
        const response = await client.patch(permissionURL.updateMemberRole(boardId, userId), {
            role,
        });
        return response.data;
    };

    return useMutation({
        ...options,
        mutationFn,
        onSuccess: (data, _var, _context) => {
            toast.success("Member role has been updated");

            options?.onSuccess?.(data, _var, _context);
        },
        onError: (err, _var, _context) => {
            const errorMessage =
                err.response?.data.message ||
                "There was an issue while trying to update a role for a user";
            toast.error(errorMessage);
            options?.onError?.(err, _var, _context);
        },
    });
};

export default useUpdateMemberRole;
