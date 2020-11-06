import React from 'react';
import { GameContext } from '../App';
import { GameType } from '../interfaces';

const Display = (props: { value: number }) => {
    return <div>{props.value}</div>
}
const Header = ({ gameType }: { gameType: GameType }) => {
    return <div className="header">
        <Display value={gameType.numberOfMines} />
        <button>:)</button>
        <Display value={100} />
    </div>
}

export default Header;
