import React from 'react';
import './Board.css';

import { useObservable } from '../lib/observableHook';
import { saveStateService, transakService, web3WalletService } from '../lib/services';
import { SaveState } from '../lib/save_state.service';

function MoonPay() {
  if (web3WalletService.currentAccount.get() === "") {
    return (
      <div className="BoardInner">
        {BoardHeader("Moonpay Onboarding")}
        <div className="BoardText">
          <p>Unable to find a Wallet.</p>
        </div>
      </div>
    );

  } else {

    return (
      <div className="BoardInner">
        {BoardHeader("Moonpay Onboarding")}
        <div className="MoonpayWrapper">
          <iframe
            className="MoonpayFrame"
            allow="payment"
            src="https://buy-staging.moonpay.io?apiKey=pk_test_Da2kRuhF7b1edKOyBi72Hn2Hc45OHUQf"
          >
            <p>Your browser does not support iframes.</p>
          </iframe>
        </div>

      </div>
    );
  }
}

function Transak() {
  // current account
  if (web3WalletService.currentAccount.get() === "") {
    return (
      <div className="BoardInner">
        {BoardHeader("Transak")}
        <div className="BoardText">
          <p>Unable to find a Wallet.</p>
        </div>
      </div>
    );
  } else {
    transakService.initOnRamp(web3WalletService.currentAccount.get());
    return (
      <div className="BoardInner">
        {BoardHeader("Transak")}
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
      {currentSaveState === SaveState.OnRampPay ? MoonPay() : Default()}
    </div>
  );
}

export default Board;