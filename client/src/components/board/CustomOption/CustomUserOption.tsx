import React from "react";

import Image from "@/components/general/Image/Image";

import "./CustomOption.scss";

type CustomUserOptionProps = {
  imageSrc?: string;
  username: string;
};

const CustomUserOption: React.FC<CustomUserOptionProps> = ({ username, imageSrc }) => {
  return (
    <div className="custom-user-option">
      <Image className="custom-user-option__avatar" src={imageSrc} />
      <span>{username}</span>
    </div>
  );
};

export default CustomUserOption;
