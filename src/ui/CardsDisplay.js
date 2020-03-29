import React, { useState, useReducer, useEffect, useRef } from "react"
import useLocalStorage from "./hooks/useLocalStorage"
import move from "array-move"
import findIndex from "./utils/findIndex"
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
  const [newCard, setNewCard] = useState({ title: "", id: null })
  const [state, dispatch] = useReducer(reducer, cardsData)

  useEffect(() => {
    setCardsData(state)
  }, [state])

  //   console.log(state)

  //All mock up

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
      <form>
        <input
          value={newCard.title}
          type="text"
          onChange={e => {
            setNewCard({ title: e.target.value })
          }}
        />

        <button
          type="submit"
          onClick={e => {
            e.preventDefault()

            dispatch({
              type: "add-card",
              payload: { ...newCard, id: Math.floor(Math.random() * 100) },
            })
            setNewCard({ title: "", id: null })
          }}
        >
          Create Card
        </button>
      </form>
      <Ul>
        {state.map((el, i) => (
          <Card key={el.id} i={i} setPosition={setPosition} moveItem={moveItem}>
            {el.title}
          </Card>
        ))}
      </Ul>
    </div>
  )
}

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  width: 300px;
`

export default CardsDisplay
