import './GameOver.css'

const GameOver = ({ score, setGameState }) => {
    return (
        <div className='container'> 
            <h1>Game Over</h1>
            <h3>Sua pontuação foi:  <span>{score}</span></h3>
            <button onClick={() => setGameState('start')}>Jogar novamente</button>
        </div>  
    )
}

export default GameOver