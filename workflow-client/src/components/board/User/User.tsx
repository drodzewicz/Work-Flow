import React from "react";

import { UserProps } from "./types";

import Image from "@/components/general/Image/Image";

import "./User-dark.scss";
import "./User.scss";

const User: React.FC<UserProps> = ({ imageSrc, username, className, onClick, children }) => {
  return (
    <div onClick={onClick} className={`user-card ${className || ""}`}>
      <Image className="user-card__avatar" src={imageSrc} />
      <span className="user-card__username">{username}</span>
      <div className="user-card__buttons">{children}</div>
    </div>
  );
};

export default User;
