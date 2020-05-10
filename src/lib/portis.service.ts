import Portis from '@portis/web3';
import Web3 from 'web3';

// the Save service implements a state machine
export class PortisService {
    private readonly web3;

    constructor() {
        const portis = new Portis('bf57913f-75a2-478a-9182-4f109666a9b4', 'mainnet');
        this.web3 = new Web3(portis.provider);
    }

    open() {
        this.web3.eth.getAccounts((error, accounts) => {
            console.log(accounts);
        });
    }
}