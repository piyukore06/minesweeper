import React from 'react';
import { Games } from '../Constants/Game';
import { GameType } from '../interfaces';

const Menu = ({ onGameChange }: { onGameChange: React.Dispatch<React.SetStateAction<GameType>> }) => {
    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const gameType = Games.find((g) => g.id === event.target.value);
        if (gameType) {
            onGameChange(gameType);
        }
    }
        
        return <>
        <h1>Minesweeper</h1>
        <div className="menu">
            <select onChange={onChange}>
                <option value="0">Game:</option>
                {Games.map((game) => (
                    <option key={game.id} value={game.id}>{game.id}</option>
                ))}
            </select>
        </div>
    </>
}

export default Menu;
