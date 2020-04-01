import React, { useLayoutEffect } from "react"
import GlobalStyle from "../styles"
import { ThemeProvider } from "styled-components"
import { theme, themeLightColors, themeDarkColors } from "../styles"
import useLocalStorage from "./hooks/useLocalStorage"
import styled from "styled-components"
import { media } from "../styles"
import egg from "../styles/img/egg.svg"
import { motion } from "framer-motion"

const CustomThemeProvider = ({ children }) => {

  const [isThemeDark, setIsThemeDark] = useLocalStorage("isDarkTheme", {
    value: false,
    isFirstTime: true,
  })

  //Set the dark theme if the user prefers it.
  useLayoutEffect(() => {
    if (
      window.matchMedia("(prefers-color-scheme: dark)")?.matches &&
      isThemeDark.isFirstTime
    )
      setIsThemeDark({
        value: true,
        isFirstTime: false,
      })
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
    <ThemeProvider theme={isThemeDark.value ? themeDark : themeLight}>
      <GlobalStyle />
      <Switch
        onClick={() => {
          setIsThemeDark(prev => ({ value: !prev.value, isFirstTime: false }))
        }}
      >
        <img src={egg} alt=""/>
        <img src={egg} alt=""/>
        <Selector
          variants={selectorVariants}
          initial={isThemeDark.value ? "dark" : "light"}
          animate={isThemeDark.value ? "light" : "dark"}
        />
      </Switch>
      {children}
    </ThemeProvider>
  )
}

const Switch = styled.div`
  position: absolute;
  left: var(--space-xs);
  top: calc(var(--space-xxl) * 1.13);
  width: var(--space-xxl);
  height: var(--space-lg);
  border-radius: var(--space-md);
  background: var(--color-primary-bg);
  box-shadow: var(--elevation-2);
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  > img {
    width: var(--space-md);
  }
  img:first-child {
    filter: invert(100%);
  }
  ${media.md`
  top: calc(var(--space-xxl) * 1.2);
  left: unset;
  right: var(--space-xs);
  `}
`

const Selector = styled(motion.div)`
  position: absolute;
  background: var(--color-primary);
  width: calc((var(--space-xxl) * 1.2) / 2);
  height: var(--space-xl);
  border-radius: 50%;
  z-index: -2;
  ${media.md`
  width: calc( var(--space-xxl) / 2);
  `}
`

const selectorVariants = {
  dark: { left: "0px" },
  light: { left: "calc(var(--space-xxl) / 2)" },
}

export default CustomThemeProvider
