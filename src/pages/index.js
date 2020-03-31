import React from "react"
import Layout from "../ui/layout"
import SEO from "../ui/seo"
import CardsDisplay from "../ui/CardsDisplay"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <CardsDisplay />
  </Layout>
)

export default IndexPage
