import { useEffect, useMemo, useState } from "react";

export enum Theme {
  DARK = "DARK",
  LIGHT = "LIGHT",
}

const useAppTheme = () => {
  const LOCAL_STORAGE_THEME_KEY = "theme";

  const persistedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
  const [isDark, setIsDark] = useState<Theme | undefined>(persistedTheme as Theme);
  const isSystemThemeDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const appTheme: boolean = useMemo(() => {
    switch (isDark) {
      case Theme.DARK:
        return true;
      case Theme.LIGHT:
        return false;
      default:
        return isSystemThemeDark;
    }
  }, [isSystemThemeDark, isDark]);

  const setThemeLight = () => {
    document.documentElement.setAttribute("data-theme", Theme.LIGHT);
    setIsDark(Theme.LIGHT);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, Theme.LIGHT);
  };

  const setThemeDark = () => {
    document.documentElement.setAttribute("data-theme", Theme.DARK);
    setIsDark(Theme.DARK);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, Theme.DARK);
  };

  const toggleTheme = () => {
    !appTheme ? setThemeDark() : setThemeLight();
  };

  useEffect(() => {
    appTheme ? setThemeDark() : setThemeLight();
  }, []);

  return { themeState: appTheme, setThemeLight, setThemeDark, toggleTheme };
};

export default useAppTheme;
