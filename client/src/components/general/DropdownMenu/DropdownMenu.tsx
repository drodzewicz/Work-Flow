import React, { PropsWithChildren, useEffect, useRef, useState } from "react";

import { useClickOutside } from "@/hooks/useClickOutside";
import useWindowSize from "@/hooks/useWindowSize";

import Portal from "@/components/layout/Portal";

import "./DropdownMenu.scss";

export interface DropdownMenuProps {
  offset?: {
    x: number;
    y: number;
  };
  onClickClose?: boolean;
  dropdownMaxHeight?: number;
  anchorRef: React.MutableRefObject<HTMLElement | null>;
  className?: string;
}

const DropdownMenu: React.FC<PropsWithChildren<DropdownMenuProps>> = ({
  children,
  anchorRef,
  dropdownMaxHeight,
  offset = { x: 0, y: 0 },
  onClickClose = true,
  className = "",
}) => {
  const [width] = useWindowSize();
  const [cords, setCords] = useState<{ left: number; top: number }>({ left: 0, top: 0 });
  const [show, setShow] = useState<boolean>(false);
  const offsetRef = useRef(offset);
  const dropDownMenuRef = useRef<HTMLUListElement>(null);

  const closeMenuClickHandler = () => {
    setShow(false);
  };
  useClickOutside([dropDownMenuRef, anchorRef], closeMenuClickHandler);

  useEffect(() => {
    const openMenu = () => {
      const rect = anchorRef.current?.getBoundingClientRect?.();
      if (rect) {
        setCords({
          left: rect.x + rect.width + offsetRef.current.x,
          top: rect.y + window.scrollY + offsetRef.current.y,
        });
      }
      setShow(true);
    };

    anchorRef.current?.addEventListener("click", openMenu);

    setShow(false);
    return () => {
      anchorRef.current?.removeEventListener("click", openMenu);
    };
  }, [width, anchorRef]);

  if (show) {
    return (
      <Portal mountTo="root-menu">
        <ul
          ref={dropDownMenuRef}
          style={{ top: cords.top, left: cords.left, maxHeight: dropdownMaxHeight }}
          onClick={onClickClose ? closeMenuClickHandler : undefined}
          className={`drop-down-menu scrollbar ${className}`}
        >
          {children}
        </ul>
      </Portal>
    );
  } else {
    return null;
  }
};

export default DropdownMenu;
