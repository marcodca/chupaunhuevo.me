
module.exports = {
  siteMetadata: {
    title: `chupaunhuevo.me`,
    description: `La plataforma para llevar el registro de las cosas que te chupan un huevo`,
    author: `Marco de Cara`,
    image: "https://i.ibb.co/3yLRXMh/screen.png"
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
        background_color: "#ef962d33",
        theme_color: "#ef962d",
        display: `standalone`,
        icon: `src/styles/img/icon.png`
      },
    },
    `gatsby-plugin-offline`,
  ],
}
