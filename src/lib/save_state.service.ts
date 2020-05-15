import { TypeState } from 'typestate';
import { Observable } from './observable';
import { ActionTags } from './bot_tags_parser';
import { chatService } from './services';

// All states that defines the current state of the chat bot
export enum SaveState {
  Idle, // first time access, no wallet
  WalletCreation
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
    this.stateMachine.from(SaveState.Idle).to(SaveState.WalletCreation);
    this.stateMachine.from(SaveState.WalletCreation).to(SaveState.Idle);
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
      case (ActionTags.WalletCreate):
        this.newState(SaveState.WalletCreation);
        return;
      case (ActionTags.ClearChat):
        chatService.clearChat();
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