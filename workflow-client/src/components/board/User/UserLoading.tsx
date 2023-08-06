import React from "react";

import Image from "@/components/general/Image/Image";

import "./User-dark.scss";
import "./User.scss";

const User: React.FC = () => {
  return (
    <div className="user-card--loading">
      <div className="user-card--loading__avatar" />
      <span className="user-card--loading__username"></span>
    </div>
  );
};

export default User;
