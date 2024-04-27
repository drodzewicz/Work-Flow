import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";

import useAuthClient from "@/hooks/useClient";

import selfQueryKeys from "./queryKeys";
import selfURL from "./url";

type OptionsType = Omit<UseMutationOptions<unknown, AxiosError>, "mutationFn">;

const useDeleteNotifications = (options?: OptionsType) => {
    const queryClient = useQueryClient();
    const client = useAuthClient();

    const mutationFn: MutationFunction<unknown> = async () => {
        const response = await client.delete(selfURL.deleteNotifications());
        return response.data;
    };

    return useMutation({
        ...options,
        mutationFn,
        onSuccess: (_data, _var, _context) => {
            queryClient.invalidateQueries(selfQueryKeys.notifications());
            options?.onSuccess?.(_data, _var, _context);
        },
    });
};

export default useDeleteNotifications;
