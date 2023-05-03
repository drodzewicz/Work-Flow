import React from "react";

export interface UserProps {
  imageSrc?: string;
  username: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}
