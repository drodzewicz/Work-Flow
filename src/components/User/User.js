import React from "react";
import Image from "components/Image/Image";
import "./User.scss";

const User = ({ imageURL, username, children }) => {
  return (
    <div className="user-card">
      <Image classes={["user-avatar"]} imageURL={imageURL} />
      <span className="username">{username}</span>
      <div className="user-buttons">{children}</div>
    </div>
  );
};

export default User;
