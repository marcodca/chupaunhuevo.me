import React from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import CustomThemeProvider from "./CustomThemeProvider"
import styled from "styled-components"

const Layout = ({ children }) => {
  return (
    <CustomThemeProvider>
      <Header siteTitle={"title"} />
      <Container>{children}</Container>
    </CustomThemeProvider>
  )
}

const Container = styled.main`
  margin: 0 auto;
  max-width: 960px;
  text-align: center;
  min-height: 70vh;
  border-radius: 5px;
  padding: var(--space-md);
`

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
