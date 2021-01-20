import React, {useState, useEffect, useContext} from 'react'

import connector from '../../lib/connector'
import {WalletConnectionContext} from "../../lib/wallet-connection"

import * as Styles from './styles'

function ConnectButton({ wallet, walletActions }) {
  const {
    account,
    signedIn
  } = wallet
  const {
    setAccount
  } = walletActions
  const walletConnection = useContext(WalletConnectionContext)
  
  const onConnect = async () => {
    await walletConnection.connect()
  }

  return (
    <Styles.Container>
      {account ? (
        <Styles.Address href={`https://etherscan.io/address/${account}`} target='new' title={account}>
          {account.slice(0, 6)}…{account.slice(-4)}
        </Styles.Address>
      ) : (
        <Styles.ConnectBtn onClick={onConnect}>
          Connect Wallet
        </Styles.ConnectBtn>
      )}
    </Styles.Container>
  )
}

export default connector(['wallet'], ['wallet'])(ConnectButton)