import React from "react";

const UserSkeleton: React.FC = () => {
  return (
    <div data-testid="skeleton-user" aria-label="user-loading" className="user-card--loading">
      <div className="user-card--loading__avatar" />
      <span className="user-card--loading__title"></span>
    </div>
  );
};

export default UserSkeleton;
