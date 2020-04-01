import React, { useState } from "react"
import { Link } from "gatsby"
import useLocalStorage from "./hooks/useLocalStorage"
import styled from "styled-components"
import { media } from "../styles"
import { motion, AnimatePresence } from "framer-motion"

const CookiesModal = () => {
  const [hasAcceptedCookies, setHasAcceptedCookies] = useLocalStorage(
    "hasAcceptedCookies",
    false
  )
  const [isReady, setIsReady] = useState(false)

  setTimeout(() => {
    setIsReady(true)
  }, 1500)

  return (
    <AnimatePresence>
      {isReady && !hasAcceptedCookies && (
        <Container
          initial={{ y: "100%" }}
          exit={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1 }}
        >
          <p>
            <span alt="cookie emoji">🍪</span>
            <b>Atención: </b> Esta página utiliza cookies, y le{" "}
            <b>chupa un huevo</b> si estas de acuerdo a no con{" "}
            <Link to="/politica-cookies">su política</Link> de las mismas
          </p>
          <span
            onClick={() => {
              setHasAcceptedCookies(true)
            }}
          >
            Aceptar
          </span>
        </Container>
      )}
    </AnimatePresence>
  )
}

const Container = styled(motion.aside)`
  width: 100%;
  min-height: var(--space-xxl);
  background: var(--color-primary);
  color: #000;
  opacity: 0.8;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${media.md`flex-direction: unset;`}
  a {
      color: inherit;
  }
  a:visited {
      color: inherit;
  }
  span {
    font-size: 1.2em;
  }
  > span {
    border: 1px solid black;
    padding: var(--space-xxs);
    margin: var(--space-xxs);
    background: rgba(255, 255, 255, 0.5);
    border-radius: 5px;
    cursor: pointer;
  }
`

export default CookiesModal
