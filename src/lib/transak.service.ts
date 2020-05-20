import transakSDK from '@transak/transak-sdk'

// Transak Service
export class TransakService {

    // inits the onramp
    initOnRamp(address: string) {
        // set the api
        let transak = new transakSDK({
            apiKey: '9fda6a58-92b1-4fb8-adb1-3764132c6048',
            environment: 'STAGING', // STAGING/PRODUCTION
            defaultCryptoCurrency: 'USDT',
            walletAddress: address, // Your customer's wallet address
            themeColor: '000000', // App theme color
            fiatCurrency: 'EUR', // INR/GBP
            email: '', // Your customer's email address
            redirectURL: '',
            hostURL: window.location.origin,
            widgetHeight: '550px',
            widgetWidth: '450px'
          });
        
          transak.init();
        
          // To get all the events
          transak.on(transak.ALL_EVENTS, (data) => {
            console.log(data)
          });
    }
}