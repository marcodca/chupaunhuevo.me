import React from "react"
import MoscaCounter from "../ui/MoscaCounter"
import Layout from "../ui/layout"
import SEO from "../ui/seo"

const mosca = () => {
  return (
    <Layout>
      <SEO title="Mosca" />
      <MoscaCounter />
    </Layout>
  )
}

export default mosca
