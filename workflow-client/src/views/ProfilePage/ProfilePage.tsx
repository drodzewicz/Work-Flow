import React from "react";

import { useGetCurrentUser, useGetNotifications } from "@/service/self";

import Image from "@/components/general/Image/Image";
import Notification from "@/components/general/Notification/Notification";

import Box from "@/components/layout/Box/Box";

const ProfilePage = () => {
  const { data: user } = useGetCurrentUser();
  const { data: notifications = [] } = useGetNotifications();

  return (
    <Box>
      <div>
        <Image style={{ width: "3rem" }} src={user?.avatarImageURL} />
        <h3>{user?.username}</h3>
        <p>{user?.email}</p>
        <p>{user?.name}</p>
        <p>{user?.surname}</p>
      </div>
      <div>
        {notifications.map((notification) => {
          return <Notification key={notification._id} notification={notification} />;
        })}
      </div>
    </Box>
  );
};

export default ProfilePage;
