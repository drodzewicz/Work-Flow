import { AxiosError } from "axios";
import { QueryFunction, UseQueryOptions, useQuery } from "react-query";

import useAuthClient from "@/hooks/useClient";

import taskQueryKeys from "./queryKeys";
import taskURL from "./url";

type TaskQueryKey = ReturnType<(typeof taskQueryKeys)["item"]>;

type OptionsType = Omit<
    UseQueryOptions<Task, AxiosError<GenericAPIError>, Task, TaskQueryKey>,
    "queryKey" | "queryFn"
>;
type GetTaskDetailsProps = { taskId: string } & OptionsType;

const useGetTaskDetails = ({ taskId, ...options }: GetTaskDetailsProps) => {
    const client = useAuthClient();

    const fetchTask: QueryFunction<Task, TaskQueryKey> = async ({ queryKey: [{ id }] }) => {
        const response = await client.get(taskURL.read(id));
        return response.data;
    };

    return useQuery({
        ...options,
        queryKey: taskQueryKeys.item(taskId),
        queryFn: fetchTask,
        staleTime: 1 * 60 * 1000,
    });
};

export default useGetTaskDetails;
