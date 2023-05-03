import React, { useRef, useState, useEffect } from "react";

import { TooltipPorps } from "./types";

import Portal from "@/components/layout/Portal";

import "./Tooltip.scss";

const Tooltip: React.FC<TooltipPorps> = ({
  className,
  children,
  anchorEl,
  debounceTimeout = 500,
  offset = { x: 0, y: 0 },
}) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [cords, setCords] = useState<{ left: number; top: number }>({ left: 0, top: 0 });
  const toolTipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let waitingTimout: ReturnType<typeof setTimeout> | null = null;

    const showToolTiphandler = () => {
      waitingTimout = setTimeout(() => {
        setShowTooltip(true);
        const rect = anchorEl.current.getBoundingClientRect();
        const divEl = toolTipRef.current as HTMLDivElement;
        const toolTipContainerWith = divEl.getBoundingClientRect().width;
        setCords({
          left: rect.x + rect.width / 2 - toolTipContainerWith / 2 + offset.x,
          top: rect.y + 30 + offset.y,
        });
      }, debounceTimeout);
    };

    const hideToolTipHandler = () => {
      if (waitingTimout) clearTimeout(waitingTimout);
      setShowTooltip(false);
    };

    const tooltipAnchorElement = anchorEl.current;
    tooltipAnchorElement.addEventListener("mouseenter", showToolTiphandler);
    tooltipAnchorElement.addEventListener("mouseleave", hideToolTipHandler);
    return () => {
      if (waitingTimout) clearTimeout(waitingTimout);
      tooltipAnchorElement.removeEventListener("mouseenter", showToolTiphandler);
      tooltipAnchorElement.removeEventListener("mouseleave", hideToolTipHandler);
    };
  }, [offset, anchorEl, debounceTimeout]);

  const computeClassName = () => {
    const classes: string[] = ["tooltip"];
    classes.push(className || "");
    return classes.join(" ");
  };

  if (showTooltip) {
    return (
      <Portal mountTo="root-menu">
        <div
          ref={toolTipRef}
          style={{ top: cords.top, left: cords.left }}
          className={computeClassName()}
        >
          {children}
        </div>
      </Portal>
    );
  } else {
    return null;
  }
};
export default Tooltip;
