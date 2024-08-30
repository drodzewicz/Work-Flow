import { useRef } from "react";
import { FaBell } from "react-icons/fa";

import { useDeleteNotifications, useGetNotifications } from "@/service/self";

import ProfileSectionCard from "@/components/layout/ProfileSectionCard/ProfileSectionCard";
import NotificationList from "@/components/general/NotificationList";

const NotificationSection = () => {
    const { data } = useGetNotifications();
    const { mutate: clearNotifications } = useDeleteNotifications();

    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <ProfileSectionCard
            className="profile-page__notifications"
            title={`Notifications (${data?.pages[0]?.totalCount})`}
            Icon={FaBell}
        >
            {!!data?.pages[0]?.totalCount && (
                <button className="btn" onClick={() => clearNotifications()}>
                    clear notifications
                </button>
            )}
            <div className="profile-page__notifications__scroll scrollbar" ref={cardRef}>
                <NotificationList getScrollParent={() => cardRef.current} />
            </div>
        </ProfileSectionCard>
    );
};

export default NotificationSection;
