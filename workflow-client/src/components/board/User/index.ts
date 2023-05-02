import React from "react";

export { default } from "./User";

export interface UserProps {
  imageSrc?: string;
  username: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}