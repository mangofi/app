import { Provider } from 'react-redux'

import store from "../config/store"

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'

function MangofiApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MangofiApp
