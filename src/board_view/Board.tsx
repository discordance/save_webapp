import React from 'react';
import './Board.css';

import { SaveState } from '../lib/save_state.service'
import { useObservable } from '../lib/observableHook';
import { saveStateService } from '../lib/services';

// sub component for portix
function PortixView() {
  return <h1>Wallet Creation</h1>;
}

function Default() {
  return <h1>Board</h1>;
}

function Board() {
  // state machine
  const currentSaveState = useObservable(saveStateService.currentState);

  return (
    <div className="Board">
      { currentSaveState === SaveState.WalletCreation ? PortixView() : Default() }
    </div>
  );
}

export default Board;