import { Provider } from 'react-redux';

import store from '../redux/store';
import { WalletConnectionProvider } from '../lib/wallet-connection';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss';

function MangofiApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <WalletConnectionProvider>
        <Component {...pageProps} />
      </WalletConnectionProvider>
    </Provider>
  );
}

export default MangofiApp;
