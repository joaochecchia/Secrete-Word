import './StartScreen.css'

const StartScreen = ({startGame}) => {
    return (
        <div className="container">
            <h1>Secrete Word</h1>
            <p>Clique aqui para jogar: </p>
            <button onClick={startGame}>Começar</button>
        </div>
    )
}

export default StartScreen