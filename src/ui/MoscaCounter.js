import React, { useReducer, useRef, useState, useEffect } from "react"
import { v4 as uuid } from "uuid"

const defaultGame = {
  hasStarted: false,
  hasFinished: false,
  winner: null,
  nrOfPlayers: null,
  players: [],
  nrOfHandsPlayed: 0,
}

const makePlayer = name => ({
  name,
  id: uuid(),
  score: [15],
  hasLost: false,
  hasWon: false,
  isDealer: false,
  hasSkipped: null,
})

const selectOptions = [
  { value: -5, label: "Alza 5" },
  { value: -4, label: "Alza 4" },
  { value: -3, label: "Alza 3" },
  { value: -2, label: "Alza 2" },
  { value: -1, label: "Alza 1" },
  { value: 0, label: "Nada" },
  { value: 1, label: "Pasa" },
  { value: 5, label: "No alza" },
]

const gameReducer = (state, action) => {
  switch (action.type) {
    case "START_GAME":
      return { ...state, hasStarted: true }
    case "SET_NR_OF_PLAYERS":
      return {
        ...state,
        nrOfPlayers: action.payload,
      }
    case "ADD_PLAYER":
      return {
        ...state,
        players: [
          ...state.players,
          {
            ...makePlayer(action.payload),
            isDealer: state.players.length ? false : true,
          },
        ],
      }
    case "NEW_HAND_SUBMITTED":
      return {
        ...state,
        players: action.payload,
        nrOfHandsPlayed: state.nrOfHandsPlayed + 1,
      }
    case "SET_DEALER":
      return {
        ...state,
        players: action.payload,
      }
    case "SET_WINNER":
      return {
        ...state,
        hasFinished: true,
        winner: action.payload,
      }
    case "PLAYER_ABANDON":
      return {
        ...state,
        players: action.payload,
      }
    case "RESTART_GAME":
      return {
        ...defaultGame,
      }
    default:
      console.error("No valid action was provided")
      return state
  }
}

const MoscaCounter = () => {
  const [game, dispatch] = useReducer(gameReducer, defaultGame)
  const selectNrOfPlayersRef = useRef()
  const playerNameRef = useRef()
  const playerAbandonRef = useRef()

  const [currentHand, setCurrentHand] = useState([])

  useEffect(() => {
    setCurrentHand(
      game.players.map(player => ({ userId: player.id, value: 0 }))
    )
  }, [game.players])

  const SelectNrOfPlayersForm = () => (
    <form>
      <label>Number of players:</label>
      <select ref={selectNrOfPlayersRef}>
        {[2, 3, 4, 5, 6].map(nr => (
          <option key={nr} value={nr}>
            {nr}
          </option>
        ))}
      </select>
      <button
        type="submit"
        onClick={e => {
          e.preventDefault()
          dispatch({ type: "START_GAME" })
          dispatch({
            type: "SET_NR_OF_PLAYERS",
            payload: Number(selectNrOfPlayersRef.current.value),
          })
        }}
      >
        Ok
      </button>
    </form>
  )

  const validateSubmitHand = () => {
    //to-do: edge case, all skip but dealer

    const negativeCurrentHandValues = currentHand.filter(el => el.value < 0)

    const negativeCurrentTotalHandValue = negativeCurrentHandValues
      .map(el => el.value)
      .reduce((acc, el) => {
        acc = acc + el
        return acc
      }, 0)

    const currentHandTotal = currentHand.reduce((acc, el) => {
      acc += el.value
      return acc
    }, 0)

    console.log("currentHandTotal", currentHandTotal)

    return negativeCurrentTotalHandValue === -5 ||
      currentHandTotal === game.players.length - 1
      ? false
      : true
  }

  console.log(game)

  const shouldBeDealerThisHand = player => {
    const findLastDealerIndex = () => {
      const index = game.players.findIndex(player => player.isDealer)
      return index === game.players.length - 1 ? -1 : index
    }
    const lastDealerIndex = findLastDealerIndex()

    console.log("lastDealerIndex", lastDealerIndex)

    const nextHandDealerIndex = game.players.findIndex(
      (player, i) => i > lastDealerIndex && !player.hasLost
    )

    //Only for not to break everything after the someone wins.
    if (nextHandDealerIndex < 0) return true

    return player.id === game.players[nextHandDealerIndex].id ? true : false
  }

  useEffect(() => {
    dispatch({
      type: "SET_DEALER",
      payload: game.players.map(player => ({
        ...player,
        isDealer: shouldBeDealerThisHand(player),
      })),
    })
  }, [game.nrOfHandsPlayed])

  useEffect(() => {
    const winners = game.players.filter(player => player.hasWon)

    const winnerByAbandon =
      game.players.length > 1 && game.players.filter(player => !player.hasLost)
    console.log("winnerByAbandon", winnerByAbandon)

    if (winners.length) {
      dispatch({
        type: "SET_WINNER",
        payload: winners,
      })
      return
    }
    if (winnerByAbandon.length === 1) {
      dispatch({
        type: "SET_WINNER",
        payload: winnerByAbandon,
      })
      return
    }
  }, [game.nrOfHandsPlayed, game.players])

  return (
    <>
      <h2>Counter:</h2>
      {
        //Todo check for more than one winner
      }
      {game.hasFinished && (
        <h3>Tenemos un ganador/a!: {game.winner[0].name}</h3>
      )}

      {!game.hasStarted ? (
        <SelectNrOfPlayersForm />
      ) : game.players.length < game.nrOfPlayers ? (
        <form>
          <label>Nombre jugador {game.players.length + 1}</label>
          <input type="text" ref={playerNameRef}></input>
          <button
            type="submit"
            onClick={e => {
              e.preventDefault()
              dispatch({
                type: "ADD_PLAYER",
                payload: playerNameRef.current.value.trim(),
              })
              playerNameRef.current.value = ""
            }}
          >
            Agregar jugador
          </button>
        </form>
      ) : (
        <div>
          Mano numero: {game.nrOfHandsPlayed + 1}, reparte{" "}
          {!game.hasFinished &&
            game.players.find(player => player.isDealer).name}
          <ul>
            {game.players.map(player => (
              <li key={player.id}>
                {player.name}: {player.score[player.score.length - 1]}{" "}
                <select
                  disabled={player.hasLost}
                  value={currentHand.find(el => el.userId === player.id)?.value}
                  onChange={e => {
                    e.persist()
                    setCurrentHand(prev =>
                      prev.map(elem =>
                        elem.userId === player.id
                          ? { ...elem, value: Number(e.target.value) }
                          : elem
                      )
                    )
                  }}
                >
                  {selectOptions.map((option, i) => (
                    <option
                      key={i}
                      value={option.value}
                      disabled={
                        (option.value === 1 && player.isDealer) ||
                        (option.value === 1 && player.hasSkipped === "twice") ||
                        (option.value === 0 && !player.isDealer)
                      }
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              dispatch({
                type: "NEW_HAND_SUBMITTED",
                payload: game.players.map((player, i) => {
                  const lastScore = player.score[player.score.length - 1]

                  const currentHandValue = currentHand[i].value
                  const currentScore = lastScore + currentHandValue
                  return {
                    ...player,
                    score: [
                      ...player.score,
                      currentHand[i].userId === player.id && currentScore,
                    ],
                    hasWon: currentScore <= 0 ? true : false,
                    hasLost: currentScore > 30 ? true : player.hasLost,
                    hasSkipped:
                      currentHandValue === 1
                        ? player.hasSkipped === "once"
                          ? "twice"
                          : "once"
                        : player.isDealer
                        ? player.hasSkipped
                        : null,
                  }
                }),
              })
              setCurrentHand(
                game.players.map(player => ({ userId: player.id, value: 0 }))
              )
            }}
            disabled={validateSubmitHand()}
          >
            Terminar mano
          </button>
          <div>
            Actions:
            <label>Jugador abandona</label>
            <select ref={playerAbandonRef}>
              {game.players.map(player => (
                <option
                  key={player.id}
                  value={player.id}
                  disabled={player.hasLost || player.isDealer}
                >
                  {player.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                const playerToAbandonRef = game.players.find(
                  player => player.id === playerAbandonRef.current.value
                )
                const playerToAbandonIndex = game.players.findIndex(
                  player => player.id === playerToAbandonRef.id
                )
                const playerToAbandon = { ...playerToAbandonRef, hasLost: true }

                const payload = [...game.players]
                payload[playerToAbandonIndex] = playerToAbandon

                dispatch({
                  type: "PLAYER_ABANDON",
                  payload,
                })
              }}
            >
              Ok
            </button>
            <br />
            <button
              onClick={() => {
                dispatch({ type: "RESTART_GAME" })
              }}
            >
              Empezar nuevo juego
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default MoscaCounter
