import React from 'react';

import { web3WalletService } from './lib/services';
import { useObservable } from './lib/observableHook';

function WalletView() {
    // current account
    const currentAccount = useObservable(web3WalletService.currentAccount);

    React.useEffect(() => {
        web3WalletService.updateWalletAccounts();
    });

    if (currentAccount !== '') {
        return <span className="Wallet-Adress">🔒 {currentAccount}</span>
    }
    return <span className="Wallet-Adress"></span>
}

export default WalletView;
