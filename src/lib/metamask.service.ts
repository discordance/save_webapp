import Web3 from 'web3';
import { chatService } from './services';

// Portis Service
export class MetamaskService {
    private web3;

    constructor() {

    }

    checkWallet() {
        if ((<any>window).ethereum) {
            this.web3 = new Web3((<any>window).ethereum);

            // tell user
            chatService.addBotMessage({text: 'Looks like you have Metamask :)'})
            chatService.sendPayload('/save.metamask_available')
            // (<any>window).ethereum.enable();
        }
    }
}