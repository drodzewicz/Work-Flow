import React from "react";

import { ImageProps } from "./types";

import defaultAvatar from "@/assets/images/default_avatar.png";

const Image: React.FC<ImageProps> = ({ src = "", ...props }) => {
  const fallback = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = defaultAvatar;
  };

  return <img {...props} src={src} onError={fallback} alt="" />;
};

export default Image;
