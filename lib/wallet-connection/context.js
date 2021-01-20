import React from "react"

import Connectors from "./connectors"

const walletConnection = new Connectors.Walletconnect

const WalletConnectionContext = React.createContext(walletConnection);

export default WalletConnectionContext