import { TypeState } from 'typestate';
import { Observable } from './observable';
import { ActionTags } from './bot_tags_parser';

// All states that defines the current state of the chat bot
export enum SaveState {
  Idle_NewComer, // first time access, no wallet
  WalletCreation
}

// the Save service implements a state machine
export class SaveStateService {
  // private state machine
  private readonly stateMachine =new TypeState.FiniteStateMachine<SaveState>(SaveState.Idle_NewComer);

  // components can observe current state
  readonly currentState = new Observable(SaveState.Idle_NewComer);

  constructor() {
    // setup state machine transitions
    this.setupTransitions();
  }

  // setups the possible transitions
  setupTransitions() {
    this.stateMachine.from(SaveState.Idle_NewComer).to(SaveState.WalletCreation);
  }

  // a bot tag was detected, check for action
  checkAction(tag: ActionTags) {
    switch (tag) {
      case (ActionTags.WalletCreate):
        this.newState(SaveState.WalletCreation);
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