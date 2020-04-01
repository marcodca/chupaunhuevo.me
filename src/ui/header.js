import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components/macro"
import { media } from "../styles"
import egg from "../styles/img/egg.svg"
import chroma from "chroma-js"

const Header = () => (
  <Container to="/">
    <TitleContainer>
      <img src={egg} alt="" />
      <Title>
        chupaunhuevo <span>.me</span>
      </Title>
    </TitleContainer>
  </Container>
)

const colors = chroma.scale([chroma("#ef962d").brighten(), "#ef962d"]).colors(5)

const gradient = ["10%", "25%", "0%", "50%", "90%"]

const colorArr = gradient.map((el, i, arr) => [colors[i], arr[i - 1] || "", el])

const Container = styled.header`
  background: var(--color-primary);
  height: var(--space-xxl);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--elevation-1);
  ${media.md`
  height: calc(var(--space-xl) * 1.2);
    justify-content: flex-start;
    background: linear-gradient(
    -45deg,
    ${colorArr.map(([c, f, s]) => `${c} ${f} ${s}`).toString()}
  );
  `}
`

const Title = styled.h1`
  margin: 0%;
  color: white;
  > span {
    color: black;
  }
  font-size: 1.7em;
  ${media.md`font-size: 2em;`}
`

const TitleContainer = styled(Link)`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  flex-direction: column;
  ${media.md`flex-direction: unset;`}
  > img {
    width: calc(var(--space-lg) * 1.4);
    svg {
      fill: var(--color-base-0);
    }
  }
`

export default Header
