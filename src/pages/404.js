import React from "react"
import Layout from "../ui/layout"
import SEO from "../ui/seo"
import styled from "styled-components"
import egg from "../styles/img/egg.svg"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Title>
      <span>4</span> <img src={egg} alt="" /> <img src={egg} alt="" />
    </Title>
    <h2>Not found</h2>
    <p>La dirección que buscas no existe.</p>
  </Layout>
)

const Title = styled.h1`
  display: flex;
  font-size: var(--space-xxl);
  justify-content: center;
  align-items: center;
  img {
    width: var(--space-sm);
  }
`

export default NotFoundPage
