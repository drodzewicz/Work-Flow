import React, { useContext } from "react";
import { ReactComponent as Spinner } from "assets/spinners/Rolling-1s-200px.svg";
import "./LoadingOverlay.scss";
import { UserContext } from "context/UserContext";
import { LoadingOverlayProps } from "./";

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  show = true,
  opacity = 1,
  classes = [""],
  color = { light: "255, 255, 255", dark: "83, 86, 87" },
  children,
}) => {
	
  const [{ theme }] = useContext(UserContext);
  let overlayColor = theme ? "255, 255, 255" : "71, 74, 75";
  if (!!color) {
    overlayColor = theme ? color.light : color.dark;
  }

  if (show) {
    return (
      <div
        className={`loading-overlay ${classes.join("")}`}
        style={{ backgroundColor: `rgba(${overlayColor}, ${opacity})` }}>
        <Spinner className="loading-overlay-spinner" />
      </div>
    );
  } else {
    return <div>{children}</div>;
  }
};

export default LoadingOverlay;
