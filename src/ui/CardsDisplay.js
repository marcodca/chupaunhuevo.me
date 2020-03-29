import React from "react"
import useLocalStorage from "./hooks/useLocalStorage"

const CardsDisplay = () => {
  const [cardsData, setCardsData] = useLocalStorage("cardsData")

  const mockArray = [
    { name: "cosa una", id: "1212" },
    { name: "cosa dos", id: "112" },
  ]

  return (
    <div>
      <button
        onClick={() => {
          setCardsData(JSON.stringify(mockArray))
        }}
      >
        Test it
      </button>
      Cards display
      {cardsData}
    </div>
  )
}

export default CardsDisplay
