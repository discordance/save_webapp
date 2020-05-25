import React from 'react';

import { web3WalletService } from './lib/services';
import { useObservable } from './lib/observableHook';

function WalletView() {
    // current account
    const currentAccount = useObservable(web3WalletService.currentAccount);
    // balances
    const balances = useObservable(web3WalletService.coinBalances);

    React.useEffect(() => {
        async function updateAccounts() {
            await web3WalletService.updateWalletAccounts();
            await web3WalletService.checkStableCoinBalance();
        }
        updateAccounts();
    });

    if (currentAccount !== '') {
        return (
            <div className="Wallet-Area">
                <span className="Wallet-Address">
                    <span role="img" aria-label="wallet">🔒</span> {currentAccount}
                </span>
                <span className="Wallet-Balances">
                    <p className="Token"><img className="Token-Img" src="https://cryptologos.cc/logos/ethereum-eth-logo.svg" />{balances.eth}</p>
                    <p className="Token"><img className="Token-Img" src="https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg" />{balances.dai}</p>
                    {/* <p className="Token"><img className="Token-Img" src="https://cryptologos.cc/logos/usd-coin-usdc-logo.svg" />{balances.usdc}</p>
                    <p className="Token"><img className="Token-Img" src="https://cryptologos.cc/logos/tether-usdt-logo.svg" />{balances.usdt}</p> */}
                </span>
            </div>
        )
    }
    return <span className="Wallet-Adress"></span>
}

export default WalletView;
