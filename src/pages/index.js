import React from "react"
import Layout from "../ui/Layout"
import SEO from "../ui/Seo"
import CardsDisplay from "../ui/CardsDisplay"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <CardsDisplay />
  </Layout>
)

export default IndexPage
