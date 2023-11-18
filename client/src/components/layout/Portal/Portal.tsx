import React from "react";

import { createPortal } from "react-dom";

export interface PortalProps {
  mountTo: string;
}

const Portal: React.FC<React.PropsWithChildren<PortalProps>> = ({ children, mountTo }) => {
  const mount = document.getElementById(mountTo)!;

  return createPortal(children, mount);
};

export default Portal;
