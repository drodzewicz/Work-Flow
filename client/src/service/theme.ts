import { theme } from "types/general";

const getAppTheme = (): theme => {
  const appTheme = localStorage.getItem("theme");
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

  if (!!appTheme) return appTheme as theme;
  return isDarkMode.matches ? theme.DARK : theme.LIGHT;
};

export { getAppTheme };
