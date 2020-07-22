import React from 'react'
import "./DropdownMenu.scss";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const DropdownMenu = ({ children, closeMenu }) => {
  return (
    <ClickAwayListener onClickAway={closeMenu}>
      <div className={"drop-down-menu"}>
        {children.map(node => (
          <div key={"" + Math.random()} className="drop-down-menu-item">
            {node}
          </div>
        ))}
      </div>
    </ClickAwayListener>
  )
}

export default DropdownMenu