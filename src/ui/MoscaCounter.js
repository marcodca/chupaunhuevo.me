import React, {
  useReducer,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from "react"
import useLocalStorage from "./hooks/useLocalStorage"
import { v4 as uuid } from "uuid"
import styled from "styled-components"

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
  const [localGame, setLocalGame] = useLocalStorage("localGame", defaultGame)

  const [game, dispatch] = useReducer(gameReducer, localGame)

  //Refs
  const selectNrOfPlayersRef = useRef()
  const playerAbandonRef = useRef()
  const scoreRef = useRef()

  const [currentHand, setCurrentHand] = useState([])

  const SelectNrOfPlayersForm = () => (
    <form>
      <label>Cantidad de jugadores:</label>
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

    return negativeCurrentTotalHandValue === -5 ||
      currentHandTotal === game.players.length - 1
      ? false
      : true
  }

  const shouldBeDealerThisHand = player => {
    const findLastDealerIndex = () => {
      const index = game.players.findIndex(player => player.isDealer)
      return index === game.players.length - 1 ? -1 : index
    }
    const lastDealerIndex = findLastDealerIndex()

    const nextHandDealerIndex = game.players.findIndex(
      (player, i) => i > lastDealerIndex && !player.hasLost
    )

    //Only for not to break everything after the someone wins.
    if (nextHandDealerIndex < 0) return true

    return player.id === game.players[nextHandDealerIndex].id ? true : false
  }

  //Effects

  //When a player is added set it to the current hand
  useEffect(() => {
    setCurrentHand(
      game.players.map(player => ({ userId: player.id, value: 0 }))
    )
  }, [game.players])

  //Check who is gonna be the dealer
  useEffect(() => {
    dispatch({
      type: "SET_DEALER",
      payload: game.players.map(player => ({
        ...player,
        isDealer: shouldBeDealerThisHand(player),
      })),
    })
  }, [game.nrOfHandsPlayed])

  //Update the score scroll
  useEffect(() => {
    if (!scoreRef.current) return
    scoreRef.current.scrollTo({
      top: scoreRef.current.scrollHeight,
      behavior: "smooth",
    })
  }, [localGame])

  //Check if there's a winner
  useEffect(() => {
    const winners = game.players.filter(player => player.hasWon)

    const winnerByAbandon =
      game.players.length > 1 && game.players.filter(player => !player.hasLost)

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

  //Each time our component state changes, we make the corresponding update to local storage
  useLayoutEffect(() => {
    setLocalGame(game)
  }, [game])

  //Component for adding players

  const AddPlayer = () => {
    const [nameInput, setNameInput] = useState("")
    const inputRef = useRef()
    const handleInputChange = e => void setNameInput(e.target.value)

    useEffect(() => {
      inputRef.current.focus()
    })

    return (
      <form>
        <label>Nombre jugador {localGame.players.length + 1}</label>
        <input
          ref={inputRef}
          type="text"
          value={nameInput}
          onChange={handleInputChange}
        ></input>
        <button
          type="submit"
          disabled={!nameInput.trim().length}
          onClick={e => {
            e.preventDefault()
            dispatch({
              type: "ADD_PLAYER",
              payload: nameInput.trim(),
            })
            setNameInput("")
          }}
        >
          Agregar jugador
        </button>
      </form>
    )
  }

  return (
    <Container>
      <h2>Mosc-counter:</h2>
      {
        //Todo check for more than one winner
      }
      {localGame.hasFinished && (
        <h3>Tenemos un ganador/a!: {localGame.winner[0].name}</h3>
      )}

      {!localGame.hasStarted ? (
        <SelectNrOfPlayersForm />
      ) : localGame.players.length < localGame.nrOfPlayers ? (
        <AddPlayer />
      ) : (
        <div>
          Mano numero: {localGame.nrOfHandsPlayed + 1}, reparte{" "}
          {!localGame.hasFinished &&
            localGame.players.find(player => player.isDealer).name}
          <Names>
            {localGame.players.map(player => (
              <li key={player.id}>{player.name}</li>
            ))}
          </Names>
          <ScoreDisplay ref={scoreRef}>
            {localGame.players.map(player => (
              <UlScore key={player.id}>
                {player.score.map((score, i) => (
                  <li key={i}>{score}</li>
                ))}
              </UlScore>
            ))}
          </ScoreDisplay>
          <ul>
            {localGame.players.map(player => (
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
                        (option.value === 1 &&
                          player.score[player.score.length - 1] <= 5) ||
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
                payload: localGame.players.map((player, i) => {
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
                localGame.players.map(player => ({
                  userId: player.id,
                  value: 0,
                }))
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
              {localGame.players.map(player => (
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
                const playerToAbandonRef = localGame.players.find(
                  player => player.id === playerAbandonRef.current.value
                )
                const playerToAbandonIndex = localGame.players.findIndex(
                  player => player.id === playerToAbandonRef.id
                )
                const playerToAbandon = { ...playerToAbandonRef, hasLost: true }

                const payload = [...localGame.players]
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
    </Container>
  )
}
//Styled components

const Container = styled.div`
  button {
    display: block;
    margin: 0 auto;
    margin-top: var(--space-md);
    appearance: none;
    background-color: var(--color-primary-light);
    outline: none;
    border: 2px solid var(--color-primary-dark);
    border-radius: 5px;
    min-width: var(--space-xxl);
  }
`

const Names = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  /* margin: 0; */
  justify-content: center;
  li {
    width: var(--space-xl);
  }
`

const ScoreDisplay = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  width: fit-content;
  height: 75px;
  overflow-y: scroll;
`

const UlScore = styled.ul`
  text-align: center;
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    width: var(--space-xl);
  }
`

export default MoscaCounter
