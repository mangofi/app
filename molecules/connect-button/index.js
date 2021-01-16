import React, {useState, useEffect} from 'react'

import connector from '../../lib/connector'
import useWalletConnection from '../../lib/use-wallet-connection'

import * as Styles from './styles'

function ConnectButton({ wallet, walletActions }) {
  const {
    account,
    signedIn
  } = wallet
  const {
    setAccount
  } = walletActions
  
  const walletConnection = useWalletConnection()
  useEffect(async () => {
    if (walletConnection) {
      await selectAccount()
    }
  }, [walletConnection, wallet.account])
  
  const onConnect = async () => {
    await walletConnection.connect()
    await selectAccount()
  }
  
  const selectAccount = async () => {
    if (signedIn) {
      return
    }

    const accounts = await walletConnection.getAccounts()

    if (accounts) {
      setAccount(accounts[0])
    }
  }

  return (
    <Styles.Container>
      {account ? (
        <Styles.Address href={`https://etherscan.io/address/${account}`} target='new' title={account}>
          {account.slice(0, 5)}…{account.slice(-4)}
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