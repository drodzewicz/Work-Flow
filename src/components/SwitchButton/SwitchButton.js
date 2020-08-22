import React, { useContext } from "react";
import "./SwitchButton.scss";
import { UserContext } from "context/UserContext";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness3Icon from "@material-ui/icons/Brightness3";

const SwitchButton = () => {
  const [{theme}, dispatchTheme] = useContext(UserContext);

	const toggle = () => {
    const themeToChange = !theme ? "THEME_LIGHT" : "THEME_DARK";
		dispatchTheme({ type: themeToChange });
	};

	return (
		<div onClick={toggle} className={`switch-button ${theme ? "" : "switch-on"}`}>
			<div className="circle">{theme ? <Brightness7Icon /> : <Brightness3Icon />}</div>
		</div>
	);
};

export default SwitchButton;
