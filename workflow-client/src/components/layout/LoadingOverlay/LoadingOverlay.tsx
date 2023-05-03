import React from "react";

import { theme } from "@/types/general";

import { LoadingOverlayProps } from "./types";

import { ReactComponent as Spinner } from "@/assets/spinners/Rolling-1s-200px.svg";

import { getAppTheme } from "@/service/theme";

import "./LoadingOverlay.scss";

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  show = true,
  opacity = 1,
  color = { light: "255, 255, 255", dark: "83, 86, 87" },
  children,
  className,
}) => {
  const themeFromLocalStorage = getAppTheme();
  const lightTheme = themeFromLocalStorage === theme.LIGHT;
  let overlayColor = lightTheme ? "255, 255, 255" : "71, 74, 75";
  if (color) {
    overlayColor = lightTheme ? color.light : color.dark;
  }

  if (show) {
    return (
      <div
        className={`loading-overlay ${className || ""}`}
        style={{ backgroundColor: `rgba(${overlayColor}, ${opacity})` }}
      >
        <Spinner className="loading-overlay-spinner" />
      </div>
    );
  } else {
    return <div className={className}>{children}</div>;
  }
};

export default LoadingOverlay;
