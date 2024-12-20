import { useState } from 'react'
import { useEffect } from 'react'
import './Game.css'

const Game = ({ 
    gameState,
    startGame,
    setGameState, 
    verifyLetter,
    pickedWord,
    pickedCategory,
    guesses,
    setGuesses,
    letters,
    guessedLetters,
    setGuessedLetters,
    wrongLetters,
    setWrongLetters,
    score,
    setScore}) => {

    const [letter, setLetter] = useState("")

    const isWordGuessed = letters.every((letra) => guessedLetters.includes(letra));

    useEffect(() => {
        if (isWordGuessed) {
            setScore(prevScore => prevScore + 100);
            setGuessedLetters([])
            setWrongLetters([])
            startGame()
        }
    }, [isWordGuessed, setScore, setGuessedLetters, setWrongLetters, startGame]);

    const handleSubmit = (e) => {
        e.preventDefault()
        if(letter.trim() !== ""){
            verifyLetter(letter.toLowerCase())
            setLetter("")
        }
    }

    return (

        <div className='game'>
            <p className='points'>
                <span>Sua pontuação: {score}</span>
            </p>
            <h1>Adivinhe a palavra:</h1>
            <h3 className='dica'>
                Dica sobre a palavra: <span>{pickedCategory}</span>
            </h3>

            <div className='wordContainer'>
                {letters.map((letra, index) => (
                    guessedLetters.includes(letra)?(
                        <span key={index} className='letter'>{letra}</span>
                    ) : (
                        <span key={index} className='blackSquare'></span>
                    )
                ))}  
            </div>
            <div className='letterContainer'>
                <p>Tentativas: <span className='attempts'>{guesses}</span></p>
                <form onSubmit={handleSubmit} action="">
                    <input 
                        type="text"
                        name='letter' 
                        maxLength='1'
                        value={letter} 
                        onChange={(e) => setLetter(e.target.value)}
                    />
                    <button type='submit'>Enviar</button>
                </form>
            </div>
            <div className='wrongLetters'>
                <p >Letras já ultilizadas</p>
                {wrongLetters.map((wrong, index) => (
                    <span key={index}>{wrong} </span>
                ))}
            </div>
        </div>
    )
}

export default Game