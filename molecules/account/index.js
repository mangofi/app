import React, {useState, useEffect} from 'react'
import Web3 from 'web3'

import * as Styles from './styles'

export default () => {
  const [address, setAddress] = useState(null);

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
    if (address) {
      return
    }

    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    
    if (accounts) {
      setAddress(accounts[0])
    }
  }
  
  useEffect(async () => {
    await loadWeb3()
    await setupAccount()
  }, [])

  return (
    <Styles.Container>
      {address ? (
        <Styles.Address href={`https://etherscan.io/address/${address}`} target='new' title={address}>
          {address.slice(0, 5)}…{address.slice(-4)}
        </Styles.Address>
      ) : (
        <Styles.ConnectBtn onClick={onConnect}>
          Connect Wallet
        </Styles.ConnectBtn>
      )}
    </Styles.Container>
  )
}