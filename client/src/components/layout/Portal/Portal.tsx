import { createPortal } from "react-dom";
import React from "react";
import { PortalProps } from "."

const Portal: React.FC<PortalProps> = ({ children, mountTo }) => {
  const mount = document.getElementById(mountTo)!;

  return createPortal(children, mount);
};

export default Portal;
