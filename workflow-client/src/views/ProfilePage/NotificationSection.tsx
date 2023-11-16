import React from "react";

import { FaBell } from "react-icons/fa";

import { useGetNotifications } from "@/service/self";

import Notification from "@/components/general/Notification/Notification";

import ItemContainer from "@/components/layout/ItemContainer";
import ProfileSectionCard from "@/components/layout/ProfileSectionCard/ProfileSectionCard";

const NotificationSection = () => {
  const { data: notifications = [] } = useGetNotifications();

  return (
    <ProfileSectionCard
      className="profile-page__notifications"
      title={`Notifications (${notifications.length})`}
      Icon={FaBell}
    >
      <ItemContainer<BoardNotification>
        className="scrollbar"
        itemKey="_id"
        items={notifications}
        noContentMessage="No new notifications at this moment..."
        maxHeight={200}
        render={(notification) => (
          <Notification key={notification._id} notification={notification} />
        )}
      />
    </ProfileSectionCard>
  );
};

export default NotificationSection;
