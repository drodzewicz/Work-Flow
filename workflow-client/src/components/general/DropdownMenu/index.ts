import React from "react";

export { default } from "./DropdownMenu";

export interface DropdownMenuProps {
  offset?: {
    x: number;
    y: number;
  };
  onClickClose?: boolean;
  scrollableAt?: number;
  anchorEl: any;
  className?: string;
  children?: React.ReactNode;
}

export type DropdownMenuItemProps = React.ComponentProps<"li">
