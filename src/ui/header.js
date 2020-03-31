import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components/macro"
import { media } from "../styles"
import egg from "../styles/img/egg.svg"

const Header = () => (
  <Container>
    <TitleContainer>
      <img src={egg} />
      <Title>
        chupaunhuevo <span>.me</span>
      </Title>
    </TitleContainer>
  </Container>
)

const Container = styled.header`
  background: var(--color-primary);
  height: var(--space-xxl);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--elevation-1);
  ${media.md`
  height: calc(var(--space-xl) * 1.2);
    /* align-items: flex-end; */
    justify-content: flex-start;
    /* padding-left: var(--space-md);
    padding-bottom: var(--space-sm); */
  `}
`

const Title = styled.h1`
  margin: 0%;
  color: white;
  > span {
    color: black;
  }
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
