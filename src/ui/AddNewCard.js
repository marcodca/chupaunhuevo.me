import React, { useState, useRef, useEffect } from "react"
import { v4 as uuid } from "uuid"
import styled from "styled-components"
import { motion } from "framer-motion"
import tick from "../styles/img/tick.svg"

const AddNewCard = ({ dispatch, hasCards }) => {
  const [newCard, setNewCard] = useState({ title: "", id: null })
  const [isTickShown, setIsTickShown] = useState(false)

  const handleInputChange = e => {
    let { value } = e.target
    if (value.length > 60) return
    setNewCard({ title: value })
  }

  const inputRef = useRef()

  //focus the input
  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }, [])

  return (
    <>
      <form style={{ position: "relative" }}>
        <Input
          ref={inputRef}
          value={newCard.title}
          type="text"
          onChange={handleInputChange}
        />
        <Button
          disabled={!newCard.title.trim().length}
          type="submit"
          onClick={e => {
            e.preventDefault()

            dispatch({
              type: "add-card",
              payload: { ...newCard, id: uuid() },
            })
            setNewCard({ title: "", id: null })
            setIsTickShown(true)
            setTimeout(() => {
              setIsTickShown(false)
            }, 600)
          }}
        >
          OK
        </Button>
        <Tick
          alt=""
          src={tick}
          variants={tickVariants}
          initial={!isTickShown ? "shown" : "hidden"}
          animate={!isTickShown ? "hidden" : "shown"}
        />
      </form>
    </>
  )
}

const Input = styled.input`
  height: var(--space-lg);
  border-radius: 5px;
  background: var(--color-primary-bg);
  color: var(--color-base-7);
  padding-left: var(--space-sm);
  font-size: var(--text-md);
  border: 0;
  outline: 0;
  &:focus {
    outline: 2px solid var(--color-primary-dark);
  }
`
const Button = styled.button`
  appearance: none;
  font-size: var(--text-md);
  height: var(--space-lg);
  background: var(--color-primary);
  outline: 0;
  border: 0;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  &:focus {
    border: 2px solid var(--color-primary-dark);
  }
  &:disabled {
    opacity: 0.7;
    cursor: unset;
  }
`

const Tick = styled(motion.img)`
  width: var(--space-md);
  position: absolute;
  margin-left: var(--space-xxs);
  margin-top: var(--space-sm);
`
const tickVariants = {
  shown: { scale: 1, opacity: 1 },
  hidden: { scale: 0, opacity: 0 },
}

export default AddNewCard
