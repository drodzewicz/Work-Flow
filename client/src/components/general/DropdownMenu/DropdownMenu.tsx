import React, { useEffect, useRef, useState, useContext } from "react";
import "./DropdownMenu.scss";
import "./DropdownMenu-dark.scss";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Portal from "HOC/Portal";
import { UserContext } from "context/UserContext";
import useWindowSize from "Hooks/useWindowSize";
import { DropdownMenuProps } from ".";

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  className,
  children,
  anchorEl,
  offset = { x: 0, y: 0 },
  onClickClose = true,
  scrollableAt,
}) => {
  const [width] = useWindowSize();
  const [cords, setCords] = useState<{ left: number; top: number }>({ left: 0, top: 0 });
  const [show, setShow] = useState(false);
  const offsetRef = useRef(offset);
  const [{ theme }] = useContext(UserContext);

  useEffect(() => {
    const dropDownMenuAnchorElement = anchorEl.current;
    
      const openMenu = () => {
        const rect = anchorEl.current.getBoundingClientRect();
        setCords({
          left: rect.x + rect.width + offsetRef.current.x,
          top: rect.y + window.scrollY + offsetRef.current.y,
        });
        setShow(true);
      };

    dropDownMenuAnchorElement.addEventListener("click", openMenu);

    setShow(false);
    return () => {
      dropDownMenuAnchorElement.removeEventListener("click", openMenu);
    };
  }, [width, anchorEl]);

  const closeMenuClickHandler = () => {
    setShow(false);
  };

  const computeClassName = () => {
    const classes: string[] = ["drop-down-menu", "scrollbar"];
    classes.push(className || "")
    classes.push(theme ? "theme-light" : "theme-dark")
    return classes.join(" ");
  }

  if (show) {
    return (
      <Portal mountTo="root-menu">
        <ClickAwayListener onClickAway={closeMenuClickHandler}>
          <ul
            style={{ top: cords.top, left: cords.left, maxHeight: scrollableAt }}
            onClick={onClickClose ? closeMenuClickHandler : undefined}
            className={computeClassName()}>
            {children}
          </ul>
        </ClickAwayListener>
      </Portal>
    );
  } else {
    return null;
  }
};

export default DropdownMenu;
