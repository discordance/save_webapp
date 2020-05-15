import React from 'react';
import './Board.css';

// import Typing from 'react-typing-animation';
import { SaveState } from '../lib/save_state.service'
import { useObservable } from '../lib/observableHook';
import { saveStateService } from '../lib/services';

function Default() {
  return (
    <div className="BoardInner">
      {BoardHeader("Board")}
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
      {Default()}
      {/* {currentSaveState === SaveState.WalletCreation ? PortisView() : Default()} */}
    </div>
  );
}

export default Board;