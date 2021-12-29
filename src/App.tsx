import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Menu from './Components/Menu';
import Octocat from './Components/Octocat';
import Playground from './Components/Playground';
import { Games } from './Constants/Game';
import useWindowDimensions from './Hooks/useWindowDimentions';

export const GameContext = React.createContext(Games.find((game) => game.id === 'beginner'));
GameContext.displayName = 'GameContext';

function App() {
  const { width } = useWindowDimensions();
  const [gameType, setGameType] = useState(width < 600 ? Games[0] : Games[1]);
  const [gameState, setGameState] = useState('🙂');

  return (
    <div style={{ backgroundImage: `url(/images/bluemoon.png)` }} className="body">
      <Octocat />
      <div className="flex-container">
        <Menu onGameChange={setGameType} />
        <Header gameState={gameState} gameType={gameType} onGameChange={setGameType} />
        <Playground onGameStateChange={setGameState} gameType={gameType} />
      </div>
    </div>
  );
}

export default App;
