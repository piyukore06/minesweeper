import React from 'react';
import { GameContext } from '../App';

const Display = (props: { value: number }) => {
    return <div>{props.value}</div>
}
const Header = () => {
    return <div className="header">
        <GameContext.Consumer>
            {(game) => {
                if (game) {
                    return <Display value={game.numberOfMines} />
                }
                return null;
            }}
        </GameContext.Consumer>
        <button>:)</button>
        <Display value={100} />
    </div>
}

export default Header;
