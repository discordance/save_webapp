import React from 'react';

import { metamaskService } from './lib/services';
import { useObservable } from './lib/observableHook';

function WalletView() {
    // current account
    const currentAccount = useObservable(metamaskService.currentAccount);

    React.useEffect(() => {
        metamaskService.updateWalletAccounts();
    });

    return <span className="Wallet-Adress">🔒{currentAccount}</span>
}

export default WalletView;
