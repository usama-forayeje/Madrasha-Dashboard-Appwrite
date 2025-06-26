import * as React from "react";

const getInitialTheme = (defaultTheme, storageKey) => {
  if (typeof window === "undefined") {
    return defaultTheme;
  }
  const storedTheme = localStorage.getItem(storageKey);
  if (storedTheme === "dark" || storedTheme === "light" || storedTheme === "system") {
    return storedTheme;
  }
  return defaultTheme;
};

const ThemeProviderContext = React.createContext({
  theme: "system",
  setTheme: () => {},
});

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme" }) {
  const [theme, setThemeState] = React.useState(getInitialTheme(defaultTheme, storageKey));

  React.useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  const value = {
    theme,
    setTheme: setThemeState,
  };

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider.");
  }

  return context;
};
