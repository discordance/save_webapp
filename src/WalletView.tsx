import React from 'react';

import { web3WalletService } from './lib/services';
import { useObservable } from './lib/observableHook';

function WalletView() {
    // current account
    const currentAccount = useObservable(web3WalletService.currentAccount);

    React.useEffect(() => {
        async function updateAccounts() {
            await web3WalletService.updateWalletAccounts();
            await web3WalletService.checkStableCoinBalance();
        }
        updateAccounts();
    });

    if (currentAccount !== '') {
        return <span className="Wallet-Adress"><span role="img" aria-label="wallet">🔒</span> {currentAccount}</span>
    }
    return <span className="Wallet-Adress"></span>
}

export default WalletView;
