import React from "react"
import styled from "styled-components"

const Footer = () => {
  return <Container></Container>
}

const Container = styled.footer`
  width: 100%;
  height: var(--space-lg);
  background: var(--color-primary-light);
  margin: 0;
  /* position: fixed; */
  bottom: 0;
  box-shadow: 0 0 0 10px var(--color-primary), 0 0 0 15px var(--color-primary-bg);
`
export default Footer
