import React from "react";

import { PortalProps } from "./types";

import { createPortal } from "react-dom";

const Portal: React.FC<PortalProps> = ({ children, mountTo }) => {
  const mount = document.getElementById(mountTo)!;

  return createPortal(children, mount);
};

export default Portal;
