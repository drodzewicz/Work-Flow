import React from "react";
import Image from "components/Image/Image";
import "./User.scss";

const User = ({ imageLink, username, children }) => {
  return (
    <div className="user-card">
      <Image classes={["user-avatar"]} imageLink={imageLink} />
      <span className="username">{username}</span>
      <div className="user-buttons">{children}</div>
    </div>
  );
};

export default User;
