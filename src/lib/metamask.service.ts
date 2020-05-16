import Web3 from 'web3';
import { chatService } from './services';
import { Observable } from './observable';

// Portis Service
export class MetamaskService {
    private web3: Web3 | null = null;
    private injectedMetamask;

    // components can observe account
    readonly currentAccount: Observable<string> = new Observable("");
    
    // update the observable account
    updateWalletAccounts() {
        if (this.walletDetection()) {
            this.checkWalletAccounts();
        }
    }

    // check if we have a a connected wallet
    async checkWalletAccounts() {
        if (this.web3) {
            try {
                let accounts = await this.web3.eth.getAccounts();
                if (accounts.length) {
                    this.currentAccount.set(accounts[0]);
                }
            } catch (error) {
                console.log('cant get accounts');
            }
        }
    }

    checkWalletAvailable() {
        if (this.walletDetection()) {
            // tell user
            chatService.sendPayload('/save.metamask_available');
        } else {
            chatService.addBotMessage({ text: 'No wallet detected :(' });
            chatService.addBotMessage({ text: 'Looks like you need one !' });
        }
    }

    async askForConnection() {
        if (this.injectedMetamask) {
            try {
                await this.injectedMetamask.enable();
                chatService.addBotMessage({ text: 'Good ! We can now resume our fantastic journey 💪' })
                await this.checkWalletAccounts();
            } catch (error) {
                console.log('refused to authorize meta mask');
                chatService.addBotMessage({ text: 'You refused the connection.' });
                chatService.addBotMessage({ text: 'No worries, I am perfectly safe 🏦' })
            }
        }
    }

    private walletDetection(): boolean {
        if ((<any>window).ethereum && (<any>window).ethereum.isMetaMask) {
            this.web3 = new Web3((<any>window).ethereum);
            this.injectedMetamask = (<any>window).ethereum;
            return true;
        }
        return false;
    }
}