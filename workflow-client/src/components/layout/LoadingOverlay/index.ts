import React from "react";
import LoadingOverlay from "./LoadingOverlay";

export interface LoadingOverlayProps {
  show?: boolean;
  opacity?: number;
  className?: string;
  color?: { light: string; dark: string } | undefined;
  children?: React.ReactNode;
}

export default LoadingOverlay;
