import React from "react";

import { DropdownMenuItemProps } from "./types";

const DropdownMenuItem: React.FC<DropdownMenuItemProps> = (props) => {
  return (
    <li {...props} className={`drop-down-menu__item ${props.className || ""}`}>
      {props.children}
    </li>
  );
};

export default DropdownMenuItem;
