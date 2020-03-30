import React, { useState, useReducer, useEffect, useRef } from "react"
import useLocalStorage from "./hooks/useLocalStorage"
import move from "array-move"
import findIndex from "./utils/findIndex"
import AddNewCard from './AddNewCard'
import Card from "./Card"
import styled from "styled-components"

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
  const [cardsData, setCardsData] = useLocalStorage("cardsData", [])
  const [state, dispatch] = useReducer(reducer, cardsData)

  useEffect(() => {
    setCardsData(state)
  }, [state])

  const positions = useRef([]).current
  console.log(positions)
  const setPosition = (i, offset) => (positions[i] = offset)
  const moveItem = (i, dragOffset) => {
    const targetIndex = findIndex(i, dragOffset, positions)
    if (targetIndex !== i)
      dispatch({
        type: "rearrange-cards",
        payload: move(state, i, targetIndex),
      })
  }

  return (
    <div>
      <AddNewCard dispatch={dispatch} hasCards={!!state.length} />
      {!state.length ? (
        <NoCardsMessage />
      ) : (
        <Ul>
          {state.map((el, i) => (
            <Card
              key={el.id}
              i={i}
              setPosition={setPosition}
              moveItem={moveItem}
            >
              {el.title}
              <br />
              Top: {i + 1}
              <br />
              <button
                onClick={() => {
                  dispatch({ type: "delete-card", payload: el.id })
                }}
              >
                Click
              </button>
            </Card>
          ))}
        </Ul>
      )}
    </div>
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

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
`

export default CardsDisplay
