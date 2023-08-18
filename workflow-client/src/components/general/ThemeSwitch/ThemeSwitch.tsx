import React from "react";

import { FaMoon, FaSun } from "react-icons/fa";

import useAppTheme from "@/hooks/useAppTheme";

import "./ThemeSwitch.scss";

const ThemeSwitch: React.FC = () => {
  const { themeState, toggleTheme } = useAppTheme();

  return (
    <div
      role="button"
      onClick={toggleTheme}
      className={`switch-button ${themeState ? "switch-button--dark" : "switch-button--light"}`}
    >
      <div className="switch-button__circle">{themeState ? <FaMoon /> : <FaSun />}</div>
    </div>
  );
};

export default ThemeSwitch;
