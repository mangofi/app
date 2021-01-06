import { Provider } from 'react-redux'

import store from "../config/store"

import '../styles/globals.css'
// import 'bootstrap/dist/css/bootstrap.min.css';

function MangofiApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MangofiApp
