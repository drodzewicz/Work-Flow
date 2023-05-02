import React from "react";

export { default } from "./ExpandText";

export interface ExpandTextProps {
  className?: string;
  title: string;
  isOpen?: boolean;
  children?: React.ReactNode;
}
