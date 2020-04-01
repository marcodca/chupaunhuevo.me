import React, { useReducer, useLayoutEffect, useRef } from "react"
import useLocalStorage from "./hooks/useLocalStorage"
import move from "array-move"
import findIndex from "./utils/findIndex"
import AddNewCard from "./AddNewCard"
import Card from "./Card"
import styled from "styled-components"
import { AnimatePresence } from "framer-motion"

const reducer = (state, action) => {
  switch (action.type) {
    case "add-card":
      return [...state, action.payload]
    case "delete-card":
      return state.filter(card => card.id !== action.payload)
    case "rearrange-cards":
      return action.payload
    default:
      return state
  }
}

const CardsDisplay = () => {
  const [cardsLocalData, setCardsLocalData] = useLocalStorage(
    "cardsLocalData",
    []
  )
  //cards is gonna be our component array of cards
  const [cards, dispatch] = useReducer(reducer, cardsLocalData)

  //Each time our component state changes, we make the corresponding update to local storage
  useLayoutEffect(() => {
    setCardsLocalData(cards)
  }, [cards])

  const positions = useRef([]).current

  const setPosition = (i, offset) => (positions[i] = offset)

  const moveItem = (i, dragOffset) => {
    const targetIndex = findIndex(i, dragOffset, positions)
    if (targetIndex !== i)
      dispatch({
        type: "rearrange-cards",
        payload: move(cards, i, targetIndex),
      })
  }

  return (
    <>
      <AddNewCard dispatch={dispatch} hasCards={!!cards.length} />
      <h3>Lista de cosas que me chupan un huevo:</h3>
      {!cards.length ? (
        <NoCardsMessage />
      ) : (
        <CardsContainer>
          <AnimatePresence>
            {cards.map((card, i) => (
              <Card
                dispatch={dispatch}
                key={card.id}
                i={i}
                setPosition={setPosition}
                moveItem={moveItem}
                content={card}
              />
            ))}
          </AnimatePresence>
        </CardsContainer>
      )}
    </>
  )
}

const NoCardsMessage = () => (
  <NoCardsText>
    Wow, <br /> <span>Nada</span> te chupa un huevo!
  </NoCardsText>
)

const NoCardsText = styled.p`
  font-size: var(--text-md);
  color: var(--color-base-5);
  > span {
    color: var(--color-base-7);
    font-weight: 700;
  }
`
const CardsContainer = styled.ul`
  list-style: none;
  padding: var(--space-lg) 0;
  margin: 0;
  position: relative;
`

export default CardsDisplay
