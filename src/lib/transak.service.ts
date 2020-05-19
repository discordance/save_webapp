import transakSDK from '@transak/transak-sdk'

// Transak Service
export class TransakService {

    // inits the onramp
    initOnRamp(address: string) {
        // set the api
        let transak = new transakSDK({
            apiKey: 'ae64c581-4b82-4d06-b075-689afcb80e00',
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