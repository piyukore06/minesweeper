import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import Menu from './Components/Menu';
import Playground from './Components/Playground';
import { Games } from './Constants/Game';

export const GameContext = React.createContext(Games.find((game) => game.id === 'beginner'));

// create a flex container
// create a menu of dropdowns
// cretate a header row for score
// create body of the game
// create a tile component 9 * 9 to start with
// add 10 mines randomly and add numbers to the tiles accordingly
// think about if the mines should bve random of some pattern is necessary
// think about how to use xstate and state mgmt

function App() {
  const [gameId, setGameId] = useState('beg');
  return (
    <div className="body">
      <div className="flex-container">
        <GameContext.Provider value={Games.find((game) => game.id === gameId)}>
          <Menu onGameChange={setGameId} />
          <Header />
          <Playground />
        </GameContext.Provider>
      </div>
    </div>
  );
}

export default App;
