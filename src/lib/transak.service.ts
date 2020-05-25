import transakSDK from '@transak/transak-sdk'

export enum PaymentState {
  Started, // nothing in particular
  Failed,
  Success
}

// Transak Service 
export class TransakService {

  // status

  // inits the onramp
  initOnRamp(address: string) {
    // set the api
    let transak = new transakSDK({
      apiKey: '9fda6a58-92b1-4fb8-adb1-3764132c6048',
      environment: 'PRODUCTION', // STAGING/PRODUCTION
      defaultCryptoCurrency: 'DAI',
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
      console.log('TRANSAK EVENT', data);
    });

    // TRANSAK_WIDGET_INITIALISED: 'TRANSAK_WIDGET_INITIALISED',
    // TRANSAK_WIDGET_OPEN: 'TRANSAK_WIDGET_OPEN',
    // TRANSAK_WIDGET_CLOSE_REQUEST: 'TRANSAK_WIDGET_CLOSE_REQUEST',
    // TRANSAK_WIDGET_CLOSE: 'TRANSAK_WIDGET_CLOSE',
    // TRANSAK_ORDER_CREATED: 'TRANSAK_ORDER_CREATED',
    // TRANSAK_ORDER_CANCELLED: 'TRANSAK_ORDER_CANCELLED',
    // TRANSAK_ORDER_FAILED: 'TRANSAK_ORDER_FAILED',
    // TRANSAK_ORDER_SUCCESSFUL: 'TRANSAK_ORDER_SUCCESSFUL'

    // This will trigger when the user marks payment is made.
    transak.on(transak.EVENTS.TRANSAK_ORDER_FAILED, () => {
      console.log('Order Failed');
      transak.close();
    });

    // This will trigger when the user marks payment is made.
    transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
      console.log(orderData);
      transak.close();
    });
  }
}