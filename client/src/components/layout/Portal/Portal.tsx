import React from "react";

import { createPortal } from "react-dom";

export interface PortalProps {
    mountTo: string;
}

const Portal: React.FC<React.PropsWithChildren<PortalProps>> = ({ children, mountTo }) => {
    let mount = document.getElementById(mountTo);
    if (!mount) {
        mount = document.createElement("div");
        mount.setAttribute("id", mountTo);
        document.body.appendChild(mount);
    }

    return createPortal(children, mount);
};

export default Portal;
