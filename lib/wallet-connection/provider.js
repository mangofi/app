import {useEffect, useContext} from "react"

import connector from "../connector"

import WalletConnectionContext from "./context"

function WalletConnectionProvider(props) {
  const {
    children,
    wallet,
    walletActions
  } = props

  const walletConnection = useContext(WalletConnectionContext)

  useEffect(async () => {
    await walletConnection.load({
      onAccountChange: (accounts) => {
        if (wallet.account !== accounts[0]) {
          walletActions.setAccount(accounts[0])
        }
      }
    })
  }, [])

  return (
    <WalletConnectionContext.Provider value={walletConnection}>
      {children}
    </WalletConnectionContext.Provider>
  )
}

export default connector(['wallet'], ['wallet'])(WalletConnectionProvider)