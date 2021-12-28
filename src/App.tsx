import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Menu from './Components/Menu';
import Playground from './Components/Playground';
import { Games } from './Constants/Game';

export const GameContext = React.createContext(Games.find((game) => game.id === 'beginner'));
GameContext.displayName = 'GameContext';

function App() {
  const [gameType, setGameType] = useState(Games[0]);
  return (
    <div className="body">
      <div className="flex-container">
        <Menu onGameChange={setGameType} />
        <Header gameType={gameType} onGameChange={setGameType} />
        <Playground gameType={gameType} />
      </div>
    </div>
  );
}

export default App;
