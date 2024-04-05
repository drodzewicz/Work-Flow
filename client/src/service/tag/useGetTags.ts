import { AxiosError } from "axios";
import { QueryFunction, UseQueryOptions, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import tagQueryKeys from "./queryKeys";
import taskURL from "./url";

type TagQueryKey = ReturnType<(typeof tagQueryKeys)["list"]>;

type OptionsType<R> = Omit<
    UseQueryOptions<Tag[], AxiosError, R, TagQueryKey>,
    "queryKey" | "queryFn"
>;

type GetColumnTasksProp<R> = {
    boardId: string;
} & OptionsType<R>;

function useGetTags<R = Tag[]>({ boardId, ...options }: GetColumnTasksProp<R>) {
    const client = useAuthClient();

    const fetchTags: QueryFunction<Tag[], TagQueryKey> = async ({ queryKey: [{ listId }] }) => {
        const response = await client.get(taskURL.index, { params: listId });
        return response.data;
    };

    return useQuery({
        ...options,
        queryKey: tagQueryKeys.list(boardId),
        queryFn: fetchTags,
        staleTime: 5 * 60 * 1000,
    });
}

export default useGetTags;
