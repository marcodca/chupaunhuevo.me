import React, { useState } from "react"
import useLocalStorage from "./hooks/useLocalStorage"

const CardsDisplay = () => {
  const [cardsData, setCardsData] = useLocalStorage("cardsData", "[]")
  const [newCard, setNewCard] = useState({ title: "" })

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
            setCardsData(prev => JSON.stringify([...JSON.parse(prev), newCard]))
            setNewCard({ title: "" })
          }}
        >
          Create Card
        </button>
      </form>
      {JSON.parse(cardsData).map((el, i) => (
        <p key={i}>{el.title}</p>
      ))}
    </div>
  )
}

export default CardsDisplay
