import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Menu from './Components/Menu';
import Octocat from './Components/Octocat';
import Playground from './Components/Playground';
import Heading from './Components/Heading';
import { Games } from './Constants/Game';
import useWindowDimensions from './Hooks/useWindowDimentions';

export const GameContext = React.createContext(Games.find((game) => game.id === 'beginner'));
GameContext.displayName = 'GameContext';

function App() {
  const { width } = useWindowDimensions();
  const isMobile = width < 600;
  const [gameType, setGameType] = useState(isMobile ? Games[0] : Games[1]);
  const [gameState, setGameState] = useState('🙂');

  return (
    <div style={{ backgroundImage: `url(/images/bluemoon.png)` }} className="body">
      <Octocat />
      <div className="flex-container">
        <Heading />
        {!isMobile && <Menu onGameChange={setGameType} />}
        <Header gameState={gameState} gameType={gameType} onGameChange={setGameType} />
        <Playground onGameStateChange={setGameState} gameType={gameType} />
      </div>
    </div>
  );
}

export default App;
