import React from 'react';
import { Games } from '../Constants/Game';
import { GameType } from '../interfaces';

const Display = (props: { value: number }) => {
    return <div className="game-type-display">{props.value}</div>
}
const Header = ({ gameType, gameState, onGameChange }: { gameType: GameType, gameState: string, onGameChange: React.Dispatch<React.SetStateAction<GameType>> }) => {
    const newGame = () => {
        onGameChange(Games[3]);
        setTimeout(() => {
            onGameChange(gameType)
        }, 0)
    }
    return <div className="header">
        <Display value={gameType.numberOfMines} />
        <button className="restart-game" onClick={newGame} >
            <span>{gameState}</span>
        </button>
        <Display value={gameType.numberOfRows * gameType.numberOfColumns} />
    </div>
}

export default Header;
