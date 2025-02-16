import React from 'react';
import './App.css';

import Chat from './chat_view/Chat';
import Board from './board_view/Board';
import WalletView from './WalletView';

function App() {
  return (
    <div className="App">
      {/* header with menu and logo */}
      <header className="App-header">
        <p>
          <span role="img" aria-label="logo">🤵</span> Hello Save
        </p>
        <WalletView/>
      </header>

      <section className="App-main">
        <Chat />
        <Board />
      </section>

    </div>
  );
}

export default App;
