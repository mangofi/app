import React, { useEffect, useState } from 'react'

import MangoToken from '../../abis/MangoToken'

import Amount from "../../molecules/amount"

import connector from "../../lib/connector"

import * as Styles from './styles'

function StakedBalance({ wallet }) {
  const isBrowser = (typeof window !== "undefined");
  const [balance, setBalance] = useState(0)

  const loadData = async () => {
    const networkId = await window.web3.eth.net.getId()
    const networkData = MangoToken.networks[networkId]
    if (networkData) {
      const mangoToken = new web3.eth.Contract(MangoToken.abi, networkData.address)
      const balanceOf = await mangoToken.methods.balanceOf(wallet.account).call()
      setBalance(balanceOf)
    }
  }
  
  const convertedBalance = () => {
    if (isBrowser && wallet.signedIn) {
      return window.web3.utils.fromWei(balance.toString(), 'Ether')
    }
    
    return balance
  }
  
  useEffect(async () => {
    if (wallet.account) {
      await loadData()
    } else {
      setBalance(0)
    }
  }, [wallet.account, wallet.signedIn])

  return (
    <Styles.Container>
      <Styles.Title>
        Available MNGO Balance
      </Styles.Title>
      <Styles.Content>
        <Amount>{convertedBalance()}</Amount>
      </Styles.Content>
    </Styles.Container>
  )
}

export default connector(['wallet'])(StakedBalance)