import React, { useEffect, useState } from "react";

import { theme } from "@/types/general";

import { FaMoon, FaSun } from "react-icons/fa";

import { getAppTheme } from "@/service/theme";

import "./ThemeSwitch-dark.scss";
import "./ThemeSwitch.scss";

const ThemeSwitch: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState(false);
  useEffect(() => {
    const themeFromLocalStorage = getAppTheme();
    if (themeFromLocalStorage) {
      switch (themeFromLocalStorage) {
        case theme.LIGHT:
          document.body.className = `theme-${theme.LIGHT}`;
          setCurrentTheme(false);
          break;
        case theme.DARK:
          document.body.className = `theme-${theme.DARK}`;
          setCurrentTheme(true);
          break;
        default:
          document.body.className = `theme-${theme.LIGHT}`;
          setCurrentTheme(false);
          break;
      }
    }
  }, []);
  const toggleTheme = () => {
    setCurrentTheme((state) => {
      if (state) {
        localStorage.setItem("theme", theme.LIGHT);
        document.body.className = `theme-${theme.LIGHT}`;
      } else {
        localStorage.setItem("theme", theme.DARK);
        document.body.className = `theme-${theme.DARK}`;
      }
      return !state;
    });
  };
  return (
    <div
      role="button"
      onClick={toggleTheme}
      className={`switch-button ${currentTheme ? "switch-button--dark" : "switch-button--light"}`}
    >
      <div className="switch-button__circle">{currentTheme ? <FaMoon /> : <FaSun />}</div>
    </div>
  );
};

export default ThemeSwitch;
