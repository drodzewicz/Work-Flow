import React from "react";

import Box from "@/components/layout/Box/Box";

import "./ProfilePage.scss";

import NotificationSection from "./NotificationSection";
import PinnedBoardsSection from "./PinnedBoardsSection";
import ProfileSection from "./ProfileSection";

const ProfilePage = () => {
  return (
    <Box className="profile-page">
      <div className="profile-page__main">
        <ProfileSection />
        <NotificationSection />
      </div>
      <PinnedBoardsSection />
    </Box>
  );
};

export default ProfilePage;
