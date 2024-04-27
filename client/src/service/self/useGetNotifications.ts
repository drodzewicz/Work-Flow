import { AxiosError } from "axios";
import { QueryFunction, useInfiniteQuery, UseInfiniteQueryOptions } from "react-query";

import useAuthClient from "@/hooks/useClient";

import selfQueryKeys from "./queryKeys";
import selfURL from "./url";

type NotificationsQueryKey = ReturnType<(typeof selfQueryKeys)["notifications"]>;

type PaginatedNotificationsList = { notifications: BoardNotification[]; totalCount: number };

type OptionsType = Omit<
    UseInfiniteQueryOptions<
        PaginatedNotificationsList,
        AxiosError,
        PaginatedNotificationsList,
        NotificationsQueryKey
    >,
    "queryKey" | "queryFn"
>;

type GetNotificationsProps = {
    limit: number;
} & OptionsType;

const useGetNotifications = (props?: GetNotificationsProps) => {
    const { limit } = props || {};
    const client = useAuthClient();

    const fetchNotifications: QueryFunction<
        PaginatedNotificationsList,
        NotificationsQueryKey
    > = async ({ pageParam = 1 }) => {
        const response = await client.get(selfURL.notifications(), {
            params: { limit, page: pageParam },
        });
        return response.data;
    };

    return useInfiniteQuery({
        queryKey: selfQueryKeys.notifications(),
        queryFn: fetchNotifications,
        refetchInterval: 60 * 1000,
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.notifications?.length > 0 ? allPages.length + 1 : undefined;
        },
    });
};

export default useGetNotifications;
