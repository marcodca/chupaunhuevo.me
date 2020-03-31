import React, { useState, useRef, useEffect } from "react"
import { motion, useMotionValue } from "framer-motion"
import styled from "styled-components"
import eggBroken from "../styles/img/egg-broken.svg"
import { media } from "../styles"

//As shown in framer-motion official example: https://codesandbox.io/s/framer-motion-drag-to-reorder-pkm1k

const Card = ({ setPosition, moveItem, i, content, dispatch }) => {
  const [isDragging, setDragging] = useState(false)

  // We'll use a `ref` to access the DOM element that the `motion.li` produces.
  // This will allow us to measure its height and position, which will be useful to
  // decide when a dragging element should switch places with its siblings.
  const ref = useRef(null)

  // By manually creating a reference to `dragOriginY` we can manipulate this value
  // if the user is dragging this DOM element while the drag gesture is active to
  // compensate for any movement as the items are re-positioned.
  const dragOriginY = useMotionValue(0)

  // Update the measured position of the item so we can calculate when we should rearrange.
  useEffect(() => {
    setPosition(i, {
      height: ref.current.offsetHeight,
      top: ref.current.offsetTop,
    })
  })

  return (
    <motion.li
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <StyledCard
        index={i + 1}
        ref={ref}
        initial={false}
        // If we're dragging, we want to set the zIndex of that item to be on top of the other items.
        animate={isDragging ? onTop : flat}
        whileHover={{
          scale: 1.03,
          boxShadow: "0px 10px 30px 7px rgba(0,0,0,0.15)",
        }}
        whileTap={{ scale: 1.12 }}
        drag="y"
        dragOriginY={dragOriginY}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={1}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        onDrag={(e, { point }) => moveItem(i, point.y)}
        positionTransition={({ delta }) => {
          if (isDragging) {
            // If we're dragging, we want to "undo" the items movement within the list
            // by manipulating its dragOriginY. This will keep the item under the cursor,
            // even though it's jumping around the DOM.
            dragOriginY.set(dragOriginY.get() + delta.y)
          }

          // If `positionTransition` is a function and returns `false`, it's telling
          // Motion not to animate from its old position into its new one. If we're
          // dragging, we don't want any animation to occur.
          return !isDragging
        }}
      >
        <IndexDisplay>{i + 1}</IndexDisplay>
        <h5>{content.title}</h5>
        <Button
          onClick={() => {
            dispatch({ type: "delete-card", payload: content.id })
          }}
        >
          <img src={eggBroken} />
          Borrar
        </Button>
      </StyledCard>
    </motion.li>
  )
}

const StyledCard = styled(motion.div)`
  padding: 0;
  margin: 0;
  border-radius: 10px;
  margin-bottom: var(--space-lg);
  height: ${props => {
    switch (props.index) {
      case 1:
        return "calc(var(--space-xxl) * 1.4)"
      case 2:
        return "calc(var(--space-xxl) * 1.25)"
      case 3:
        return "calc(var(--space-xxl) * 1.12)"
      default:
        return "var(--space-xxl)"
    }
  }};
  cursor: -webkit-grab;
  &:active {
    cursor: -webkit-grabbing;
  }
  width: 100%;
  background: var(--color-primary-light);
  position: relative;
  will-change: transform;
  color: var(--color-accent-dark);
  display: flex;
  justify-content: space-between;
  align-items: center;
  h5 {
    font-size: var(--text-md);
    margin: 0;
    margin-left: var(--space-md);
    ${media.md`
    margin-left: var(--space-xxl);
    `}
    text-transform: capitalize;
  }
`

const IndexDisplay = styled.span`
  position: absolute;
  top: calc(var(--space-xs) * -1);
  left: calc(var(--space-xs) * -1);
  font-size: var(--text-xxl);
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(var(--space-md) * 0.7);
  height: var(--space-md);
  border-radius: 50%/60% 60% 40% 40%;
  border: solid 7px var(--color-base-0);
  background: var(--color-primary);
`

const Button = styled.button`
  appearance: none;
  cursor: pointer;
  width: var(--space-xxl);
  background: var(--color-primary);
  border: 2px solid var(--color-primary-dark);
  border-radius: 0 10px 10px 0;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: var(--space-lg);
  }
`

// Spring configs
const onTop = { zIndex: 1, boxShadow: "0px 10px 30px 7px rgba(0,0,0,0.15)" }
const flat = {
  zIndex: 0,
  boxShadow: "0px 14px 34px -5px rgba(0,0,0,0.25)",
  transition: { delay: 0.3 },
}

export default Card
