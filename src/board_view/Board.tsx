import React from 'react';
import './Board.css';

import { SaveState } from '../lib/save_state.service'
import { useObservable } from '../lib/observableHook';
import { saveStateService, portisService } from '../lib/services';

// sub component for portis
function PortisView() {
  // open portis
  portisService.open();
  
  return (
    <div className="BoardInner">
      { BoardHeader("Wallet with Portis™") }
    </div>
  );
}

function Default() {
  return (
    <div className="BoardInner">
      { BoardHeader("Board") }
    </div>
  );
}

function BoardHeader(title: string) {
  return (
    <div className="BoardHeader">
      <h1 className="BoardTitle">{title}</h1>
      <span className="BoardCancel" onClick={() => saveStateService.backToIdle()}>×</span>
    </div>
  );
}

function Board() {
  // state machine
  const currentSaveState = useObservable(saveStateService.currentState);

  return (
    <div className={saveStateService.shouldBoardBeOpen() ? 'Board visible' : 'Board'}>
      {currentSaveState === SaveState.WalletCreation ? PortisView() : Default()}
    </div>
  );
}

export default Board;