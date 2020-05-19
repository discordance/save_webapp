import React from 'react';
import './Board.css';

import { useObservable } from '../lib/observableHook';
import { saveStateService, transakService, web3WalletService } from '../lib/services';
import { SaveState } from '../lib/save_state.service';

function Transak() {
  // current account
  if (web3WalletService.currentAccount.get() === "") {
    return (
      <div className="BoardInner">
        {BoardHeader("Transak Fiat Pay")}
        <div className="BoardMessage">
          <p>Unable to find a Wallet</p>
        </div>
      </div>
    );
  } else {
    transakService.initOnRamp(web3WalletService.currentAccount.get());
    return (
      <div className="BoardInner">
        {BoardHeader("Transak Fiat Pay")}
        <div className="BoardText">
          <p>Fund your Wallet</p>
        </div>
      </div>
    );
  }

}

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
      {currentSaveState === SaveState.OnRampPay ? Transak() : Default()}
    </div>
  );
}

export default Board;