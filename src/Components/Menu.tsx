import React, { Dispatch, SetStateAction } from 'react';
import { Games } from '../Constants/Game';

const Menu = ({ onGameChange }: { onGameChange: Dispatch<SetStateAction<string>> }) => {
    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onGameChange(event.target.value);
    }
    return <div className="menu">
        <select onChange={onChange}>
            <option value="0">Game:</option>
            {Games.map((game) => (
                <option key={game.id} value={game.id}>{game.id}</option>
            ))}
        </select>
    </div>
}

export default Menu;
