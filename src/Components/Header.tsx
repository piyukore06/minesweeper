import React from 'react';
import { GameType } from '../interfaces';

const Display = (props: { value: number }) => {
    return <div className="game-type-display">{props.value}</div>
}
const Header = ({ gameType, gameState, onGameChange }: { gameType: GameType, gameState: string, onGameChange: React.Dispatch<React.SetStateAction<GameType>> }) => {
    const newGame = () => {
        onGameChange(gameType)
    }
    return <div className="header">
        <Display value={gameType.numberOfMines} />
        <button className="restart-game" onClick={newGame} >{gameState}</button>
        <Display value={100} />
    </div>
}

export default Header;
