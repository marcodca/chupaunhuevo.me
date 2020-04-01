import React from "react"
import PropTypes from "prop-types"
// import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import CustomThemeProvider from "./CustomThemeProvider"
import styled from "styled-components"
import { media } from "../styles"
import Footer from "./Footer"
import CookiesModal from "./CookiesModal"

const Layout = ({ children }) => {
  return (
    <CustomThemeProvider>
      <Header siteTitle={"title"} />
      <Container>{children}</Container>
      <Footer />
      <CookiesModal />
    </CustomThemeProvider>
  )
}

const Container = styled.main`
  margin: 0 auto;
  max-width: 960px;
  text-align: center;
  min-height: 75vh;
  border-radius: 5px;
  padding: var(--space-md);
  margin-top: var(--space-lg);
  ${media.md`
  margin-top: 0;
  `}
`

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
