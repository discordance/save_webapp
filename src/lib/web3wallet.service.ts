import Web3 from 'web3';
import { chatService } from './services';
import { Observable } from './observable';

// Web3 Wallet Service
export class Web3WalletService {
    private web3: Web3 | null = null;
    private injectedWallet;

    // components can observe account
    readonly currentAccount: Observable<string> = new Observable("");

    // update the observable account
    async updateWalletAccounts() {
        if (this.walletDetection()) {
            await this.checkWalletAccounts();
        }
    }

    // check for stable coin balances
    async checkStableCoinBalance() {
        const account = this.currentAccount.get();
        if (account !== '' && this.web3) {
            // check ETH
            let ethBalance = await this.web3.eth.getBalance(account);
            ethBalance = Web3.utils.fromWei(ethBalance, 'ether');
            console.log('ETH BALANCE', ethBalance);

            // dai
            const daiBalance = await this.checkContractBalance(account, '0x6b175474e89094c44da98b954eedeac495271d0f', 18);
            console.log('DAI BALANCE', daiBalance);

            // usdc
            const usdcBalance = await this.checkContractBalance(account, '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', 6);
            console.log('USDC BALANCE', usdcBalance);

            // usdt
            const usdtBalance = await this.checkContractBalance(account, '0xdac17f958d2ee523a2206206994597c13d831ec7', 6);
            console.log('USDT BALANCE', usdtBalance);

        } else {
            console.log('nope');
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
            chatService.sendPayload('/save.wallet_available');
        } else {
            // @TODO send a payload
            chatService.sendPayload('/save.wallet_unavailable');
        }
    }

    async askForConnection() {
        if (this.injectedWallet) {
            try {
                await this.injectedWallet.enable();
                chatService.addBotMessage({ text: 'Good ! We can now resume our fantastic journey 💪' });
                await this.checkWalletAccounts();
            } catch (error) {
                console.log('refused to authorize');
                chatService.addBotMessage({ text: 'You refused the connection.' });
                chatService.addBotMessage({ text: 'No worries, I am perfectly safe 🏦' });
            }
        }
    }

    private walletDetection(): boolean {
        if ((<any>window).ethereum) {
            this.web3 = new Web3((<any>window).ethereum);
            this.injectedWallet = (<any>window).ethereum;
            return true;
        }
        return false;
    }

    //
    private async checkContractBalance(holderAddress: string, contractAddress: string, decimals: number): Promise<number | null> {
        if (this.web3) {
            const contract = new this.web3.eth.Contract(erc20ABI, contractAddress);
            const balance = await contract.methods.balanceOf(holderAddress).call();
            const adjustedBalance = balance / Math.pow(10, decimals);
            return adjustedBalance;
        }
        return null;
    }
}

const erc20ABI: any = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "type": "function"
    }
];