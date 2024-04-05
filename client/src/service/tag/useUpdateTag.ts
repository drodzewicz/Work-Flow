import { AxiosError } from "axios";
import { MutationFunction, UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

import useAuthClient from "@/hooks/useClient";

import tagQueryKeys from "./queryKeys";
import tagURL from "./url";

type UpdateTagPayload = {
    tagId: string;
    name: string;
    key: string;
};

type OptionsType = Omit<
    UseMutationOptions<Tag, AxiosError<GenericAPIError>, UpdateTagPayload>,
    "mutationFn"
>;

const useUpdateTag = (options?: OptionsType) => {
    const queryClient = useQueryClient();
    const client = useAuthClient();

    const mutationFn: MutationFunction<Tag, UpdateTagPayload> = async ({ tagId, ...data }) => {
        const response = await client.put(tagURL.update(tagId), { ...data });
        return response.data;
    };

    return useMutation({
        ...options,
        mutationFn,
        onSuccess: (_data, _var, _context) => {
            toast.success("Tag updated");

            queryClient.invalidateQueries(tagQueryKeys.all);
            options?.onSuccess?.(_data, _var, _context);
        },
        onError: (err, _var, _context) => {
            const errorMessage =
                err.response?.data.message || "There was an issue while trying to update a tag";
            toast.error(errorMessage);
            options?.onError?.(err, _var, _context);
        },
    });
};

export default useUpdateTag;
