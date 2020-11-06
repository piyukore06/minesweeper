import React from 'react';
import { GameContext } from '../App';
import { createInitialState } from '../Constants/Game';

const Playground = () => {
    return <div className="playground">
        <GameContext.Consumer>
            {(game) => {
                if (game) {
                    console.log(game)
                    document.documentElement.style.setProperty('--number-of-rows', game.numberOfRows + '');
                    document.documentElement.style.setProperty('--number-of-columns', game.numberOfColumns + '');
                    const tiles = createInitialState(game);
                    return tiles.map((row) =>
                        row.map(
                            (tile) =>
                                <button key={tile.id} className="tile">{tile.value || ''}</button>
                        )
                    );
                }
                return null;
            }}
        </GameContext.Consumer>
    </div>
}

export default Playground;
