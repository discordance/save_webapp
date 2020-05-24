import { TypeState } from 'typestate';
import { Observable } from './observable';
import { ActionTags } from './bot_tags_parser';
import { chatService, web3WalletService } from './services';

// All states that defines the current state of the chat bot
export enum SaveState {
  Idle, // nothing in particular
  OnRampPay
}

// the Save service implements a state machine
export class SaveStateService {
  // private state machine
  private readonly stateMachine =new TypeState.FiniteStateMachine<SaveState>(SaveState.Idle);

  // components can observe current state
  readonly currentState = new Observable(SaveState.Idle);

  constructor() {
    // setup state machine transitions
    this.setupTransitions();
  }

  // setups the possible transitions
  setupTransitions() {
    this.stateMachine.from(SaveState.Idle).to(SaveState.OnRampPay);
    this.stateMachine.from(SaveState.OnRampPay).to(SaveState.Idle);
  }

  // for board
  shouldBoardBeOpen(): boolean {
    return this.currentState.get() !== SaveState.Idle
  }

  // back to idle
  backToIdle() {
    this.newState(SaveState.Idle);
  }

  // a bot tag was detected, check for action
  checkAction(tag: ActionTags) {
    switch (tag) {
      // case (ActionTags.WalletCreate):
      //   this.newState(SaveState.WalletCreation);
      //   return;
      case (ActionTags.ClearChat):
        chatService.clearChat();
        return;
      case (ActionTags.WalletCheck):
        web3WalletService.checkWalletAvailable();
        return;  
      case (ActionTags.WalletConnect):
        web3WalletService.askForConnection();
        return;  
      case (ActionTags.OnRampPay):
        this.newState(SaveState.OnRampPay);
        return;                        
      default:
        return;  
    }
  }

  // go to a new state and update observable
  private newState(newState: SaveState) {
    if(this.stateMachine.canGo(newState)) {
      // update the state machine
      this.stateMachine.go(newState);
      // update the observable
      this.currentState.set(this.stateMachine.currentState);
    }
  }
}