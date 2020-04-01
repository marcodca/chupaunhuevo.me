import { theme } from "./src/styles"
import chroma from "chroma-js"

module.exports = {
  siteMetadata: {
    title: `chupaunhuevo.me`,
    description: `La plataforma para llevar el registro de las cosas que te chupan un huevo`,
    author: `Marco de Cara`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `chupaunhuevo.me`,
        short_name: `chupaunhuevo.me`,
        start_url: `/`,
        background_color: chroma(theme.colors.primary).alpha(0.2),
        theme_color: theme.colors.primary,
        display: `standalone`,
        icons: [
          {
            src: "/icons/192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icons/512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
    },
    `gatsby-plugin-offline`,
  ],
}
