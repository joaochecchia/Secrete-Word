import { useCallback, useReducer, useState } from 'react'

import { Words } from '../util/Words'

import StartScreen from '../Components/StartScreen'
import './App.css'
import Game from '../Components/Game'
import GameOver from '../Components/GameOver'

function App() {
  //estagios do jogo para aparecerem a tela
  const stages = [
    {id: 1, name: 'start'},
    {id: 2, name: 'game'},
    {id: 3, name: 'end'}
  ]

  const [words] = useState(Words)
  const [gameState, setGameState] = useState(stages[0].name)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLeters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(0)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = () => {
    const categories = Object.keys(Words)
    const category = categories[Math.floor(Math.random() * categories.length)]
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return [word, category]
  }

  const verifyLetter = (letter) => {
    if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) {
      return
    }
  
    if (pickedWord.includes(letter)) {
      const updatedGuessedLetters = [...guessedLetters, letter]
      setGuessedLeters(updatedGuessedLetters)
      console.log('essas sao as letras: ' + guesses)
    } else {

      const updatedWrongLetters = [...wrongLetters, letter]
      setWrongLetters(updatedWrongLetters)
      setGuesses((prevGuesses) => prevGuesses - 1)
  
      if (guesses === 0) {
        setGameState('end')
      }
    }
  }

  const startGame = () => {
    setGameState(stages[1].name)
    const [word, category] = pickWordAndCategory()

    setPickedWord(word)
    setPickedCategory(category)
    setGuesses(3)
    
    const letters = word.split('')
    setLetters(letters)

    console.log(letters)
}

  return (
    <div className='App'>
      {gameState === 'start'&& <StartScreen startGame={startGame}/>}
      {gameState === 'game' && <Game
        gameState={gameState}
        startGame={startGame}
        verifyLetter={verifyLetter}
        pickedWord={pickedWord} // Certifique-se de usar o nome correto
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        setGuessedLetters={setGuessedLeters}
        wrongLetters={wrongLetters}
        setWrongLetters={setWrongLetters}
        guesses={guesses}
        setGuesses={setGuesses}
        score={score}
        setScore={setScore}
      />}
      {gameState === 'end'&& <GameOver
        score={score}
        setGameState={setGameState}
      />}
    </div>
  )
}

export default App