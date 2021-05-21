import React from "react";
import "./SwitchButton.scss";
import "./SwitchButton-dark.scss";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import { SwitchButtonProps } from "./";

const SwitchButton: React.FC<SwitchButtonProps> = ({ toggle, value }) => {
  return (
    <div
      role="button"
      onClick={toggle}
      className={`switch-button ${
        value ? "switch-button--on" : "switch-button--off"
      }`}>
      <div className="switch-button__circle">
        {value ? <Brightness3Icon /> : <Brightness7Icon />}
      </div>
    </div>
  );
};


export default SwitchButton;
