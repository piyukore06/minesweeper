import React from 'react';
import { GameType } from '../interfaces';

const Display = (props: { value: number }) => {
    return <div>{props.value}</div>
}
const Header = ({ gameType, onGameChange }: { gameType: GameType, onGameChange: React.Dispatch<React.SetStateAction<GameType>> }) => {
    const newGame = () => {
        onGameChange(gameType)
    }
    return <div className="header">
        <Display value={gameType.numberOfMines} />
        <button onClick={newGame} >:)</button>
        <Display value={100} />
    </div>
}

export default Header;
