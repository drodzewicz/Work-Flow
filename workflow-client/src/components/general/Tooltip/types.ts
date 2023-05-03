import React from "react";

export interface TooltipPorps {
  className?: string;
  anchorEl: any;
  offset?: { x: number; y: number };
  debounceTimeout?: number;
  children?: React.ReactNode;
}
