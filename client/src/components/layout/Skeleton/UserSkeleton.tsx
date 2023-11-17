import React from "react";

const UserSkeleton: React.FC = () => {
  return (
    <div className="user-card--loading">
      <div className="user-card--loading__avatar" />
      <span className="user-card--loading__title"></span>
    </div>
  );
};

export default UserSkeleton;
