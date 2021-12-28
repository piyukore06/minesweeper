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
  const [gameState, setGameState] = useState(':)');
  return (
    <div style={{ backgroundImage: `url(/images/bluemoon.png)` }} className="body">
      <div className="flex-container">
        <Menu onGameChange={setGameType} />
        <Header gameState={gameState} gameType={gameType} onGameChange={setGameType} />
        <Playground onGameStateChange={setGameState} gameType={gameType} />
      </div>
    </div>
  );
}

export default App;
