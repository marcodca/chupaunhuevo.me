import React from "react"
import styled from "styled-components"
import logo from "../styles/img/logo.png"

const Footer = () => {
  return (
    <Container>
      <a href="https://www.marcodecara.com/">
        By <img alt="Marco de Cara Logo" src={logo} />
      </a>
    </Container>
  )
}

const Container = styled.footer`
  width: 100%;
  height: var(--space-lg);
  background: var(--color-primary-light);
  margin: 0;
  /* position: fixed; */
  bottom: 0;
  box-shadow: 0 0 0 10px var(--color-primary),
    0 0 0 15px var(--color-primary-bg);
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  > a {
    color: black;
    text-decoration: none;
    display: flex;
    align-items: center;
    &:visited {
      color: black;
    }
    img {
      width: calc(var(--space-md) * 1.3);
      margin-right: var(--space-lg);
      margin-left: var(--space-xxs);
    }
  }
`
export default Footer
