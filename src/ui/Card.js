import React, { useState, useRef, useEffect } from "react"
import { motion, useMotionValue } from "framer-motion"
import chroma from "chroma-js"
import styled from "styled-components"

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
        <h5>{content.title}</h5>
        <button
          onClick={() => {
            dispatch({ type: "delete-card", payload: content.id })
          }}
        >
          Delete
        </button>
      </StyledCard>
    </motion.li>
  )
}

const StyledCard = styled(motion.div)`
  padding: 0;
  margin: 0;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  width: 100%;
  background: var(--color-primary-light);
  position: relative;
  will-change: transform;
`

// Spring configs
const onTop = { zIndex: 1, boxShadow: "0px 10px 30px 7px rgba(0,0,0,0.15)" }
const flat = {
  zIndex: 0,
  boxShadow: "0px 14px 34px -5px rgba(0,0,0,0.25)",
  transition: { delay: 0.3 },
}

export default Card
