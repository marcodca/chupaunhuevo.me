import React from "react"
import Layout from "../ui/layout"
import SEO from "../ui/seo"
import styled from "styled-components"

const PoliticaCookies = () => (
  <Layout>
    <SEO title="Cookies Policy" />
    <Container>
      <h2>POLÍTICA DE COOKIES</h2>
      <h3>INTRODUCCIÓN</h3>
      <p>
        Mediante el presente esta web le informa de su política de cookies,
        cumpliendo así con lo previsto en el artículo 22.2 de la Ley 34/2002, de
        11 de julio de Servicios de la Sociedad de la Información y de Comercio
        Electrónico.
      </p>
      <h3>QUÉ ES UNA COOKIE</h3>
      <p>
        Cookie es un fichero que se descarga en su ordenador al acceder a
        determinadas páginas web. Las cookies permiten a una página web, entre
        otras cosas, almacenar y recuperar información sobre los hábitos de
        navegación de un usuario o de su equipo y, dependiendo de la información
        que contengan y de la forma en que utilice su equipo, pueden utilizarse
        para reconocer al usuario. El navegador del usuario memoriza cookies en
        el disco duro solamente durante la sesión actual ocupando un espacio de
        memoria mínimo y no perjudicando su ordenador. Las cookies no contienen
        ninguna clase de información personal específica, y la mayoría de las
        mismas se borran del disco duro al finalizar la sesión de navegador. La
        mayoría de los navegadores aceptan como estándar a las cookies y, con
        independencia de las mismas, permiten o impiden en los ajustes de
        seguridad las cookies temporales o memorizadas. Sin su consentimiento
        mediante la activación de las cookies en su navegador, no se enlazará en
        las cookies los datos memorizados con sus datos personales
        proporcionados en el momento del registro o la compra. El Usuario acepta
        expresamente, por la utilización de este portal, el tratamiento de la
        información recabada en la forma y con los fines anteriormente
        mencionados. Y asimismo reconoce conocer la posibilidad de rechazar el
        tratamiento de tales datos o información rechazando el uso de Cookies
        mediante la selección de la configuración apropiada a tal fin en su
        navegador. Si bien esta opción de bloqueo de Cookies en su navegador
        puede no permitirle el uso pleno de todas las funcionalidades de la web.
        Puede usted permitir, bloquear o eliminar las cookies instaladas en su
        equipo mediante la configuración de las opciones del navegador instalado
        en su ordenador.
      </p>
    </Container>
  </Layout>
)

const Container = styled.div`
  background: var(--color-primary-bg);
  padding: var(--space-lg);
  border-radius: 5px;
`

export default PoliticaCookies
