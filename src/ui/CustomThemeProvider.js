import React, { useState, useLayoutEffect } from "react"
import GlobalStyle from "../styles"
import { ThemeProvider } from "styled-components"
import { theme, themeLightColors, themeDarkColors } from "../styles"

const CustomThemeProvider = ({ children }) => {
  const [isThemeDark, setIsThemeDark] = useState(false)

  //Set the dark theme if the user prefers it.
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)")?.matches)
      setIsThemeDark(true)
    return
  }, [])

  //The custom themes for color preferences.
  const themeDark = {
    ...theme,
    colors: { ...theme.colors, base: themeDarkColors.base },
  }
  const themeLight = {
    ...theme,
    colors: { ...theme.colors, base: themeLightColors.base },
  }

  return (
    <ThemeProvider theme={isThemeDark ? themeDark : themeLight}>
      <GlobalStyle />
      <button
        style={{
          position: "absolute",
          bottom: 0,
        }}
        onClick={() => {
          setIsThemeDark(prev => !prev)
        }}
      >
        Toggle theme mode
      </button>
      {children}
    </ThemeProvider>
  )
}

export default CustomThemeProvider
