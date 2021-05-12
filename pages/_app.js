import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';

import store from '../redux/store';
import { WalletConnectionProvider } from '../lib/wallet-connection';

import '../styles/globals.scss';
import theme from '../styles/material-ui-theme';

function MangofiApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <WalletConnectionProvider>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </WalletConnectionProvider>
    </Provider>
  );
}

export default MangofiApp;
