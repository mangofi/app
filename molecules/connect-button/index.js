import React, {useState, useEffect} from 'react'
import Web3 from 'web3'

import connector from '../../lib/connector'

import * as Styles from './styles'

function ConnectButton({ wallet, walletActions }) {
  const {
    account,
    signedIn
  } = wallet
  const {
    setAccount
  } = walletActions

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  
  const onConnect = async () => {
    await window.ethereum.enable()
    await setupAccount()
  }
  
  const setupAccount = async () => {
    if (signedIn) {
      return
    }

    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    
    if (accounts) {
      setAccount(accounts[0])
    }
  }
  
  useEffect(async () => {
    await loadWeb3()
    await setupAccount()
  }, [])

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