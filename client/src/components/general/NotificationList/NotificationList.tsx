import { useGetNotifications } from "@/service/self";
import React, { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Notification from "@/components/general/Notification";

type NotificationListProps = {
    getScrollParent: () => HTMLElement | null;
};

const NotificationList: React.FC<NotificationListProps> = ({ getScrollParent }) => {
    const { data, fetchNextPage, hasNextPage } = useGetNotifications({
        limit: 5,
    });

    const notifications = useMemo(() => {
        return (
            data?.pages.reduce((acc, page) => {
                return [...acc, ...page.notifications];
            }, [] as BoardNotification[]) || []
        );
    }, [data]);
    return (
        <InfiniteScroll
            pageStart={1}
            loadMore={() => fetchNextPage()}
            hasMore={hasNextPage}
            useWindow={false}
            getScrollParent={getScrollParent}
            loader={
                <div className="loader" key={0}>
                    Loading ...
                </div>
            }
        >
            {notifications.map((notification) => (
                <Notification key={notification._id} notification={notification} />
            ))}
        </InfiniteScroll>
    );
};

export default NotificationList;
