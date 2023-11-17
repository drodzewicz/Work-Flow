import React from "react";

import { createPortal } from "react-dom";

export interface PortalProps {
  mountTo: string;
  children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children, mountTo }) => {
  const mount = document.getElementById(mountTo)!;

  return createPortal(children, mount);
};

export default Portal;
