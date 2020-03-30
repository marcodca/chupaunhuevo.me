import React, { useState, useRef, useEffect } from "react"
import { motion, useMotionValue } from "framer-motion"
import chroma from "chroma-js"
import styled from "styled-components"

const Card = ({ color, setPosition, moveItem, i, children }) => {
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
    <>
      <StyledCard
        ref={ref}
        initial={false}
        // If we're dragging, we want to set the zIndex of that item to be on top of the other items.
        animate={isDragging ? onTop : flat}
        style={{ background: "pink", height: "60px" }}
        whileHover={{ scale: 1.03 }}
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
        {children}
      </StyledCard>
    </>
  )
}

const StyledCard = styled(motion.li)`
  padding: 0;
  margin: 0;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  width: 100%;
  position: relative;
  will-change: transform;
`

// Spring configs
const onTop = { zIndex: 1 }
const flat = {
  zIndex: 0,
  transition: { delay: 0.3 },
}

export default Card
