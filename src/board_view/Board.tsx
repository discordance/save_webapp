import React from 'react';
import './Board.css';
import transakSDK from '@transak/transak-sdk'

import { useObservable } from '../lib/observableHook';
import { saveStateService } from '../lib/services';
import { SaveState } from '../lib/save_state.service';

function Transak() {
  let transak = new transakSDK({
    apiKey: 'ae64c581-4b82-4d06-b075-689afcb80e00',
    environment: 'STAGING', // STAGING/PRODUCTION
    defaultCryptoCurrency: 'USDT',
    walletAddress: '0xf4f630C890f7Fb03ba289F10fb2BE8F87027a474', // Your customer's wallet address
    themeColor: '000000', // App theme color
    fiatCurrency: 'EUR', // INR/GBP
    email: '', // Your customer's email address
    redirectURL: '',
    hostURL: window.location.origin,
    widgetHeight: '550px',
    widgetWidth: '450px'
  });

  transak.init();

  // To get all the events
  transak.on(transak.ALL_EVENTS, (data) => {
    console.log(data)
  });

  return (
    <div className="BoardInner">
      {BoardHeader("Pay")}
    </div>
  );
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