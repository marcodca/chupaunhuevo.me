import React, { useState, useLayoutEffect } from "react";
import GlobalStyle from "../styles";
import { ThemeProvider } from "styled-components";
import { themeLight, themeDark } from "../styles";

const CustomThemeProvider = ({ children }) => {
  const [isThemeDark, setIsThemeDark] = useState(false);

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)")?.matches)
      setIsThemeDark(true);
    return;
  }, []);

  return (
    <ThemeProvider theme={isThemeDark ? themeDark : themeLight}>
      <GlobalStyle />
      <button
        onClick={() => {
          setIsThemeDark(prev => !prev);
        }}
      >
        Toggle theme mode
      </button>
      {children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
