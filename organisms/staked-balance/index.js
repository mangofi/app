import React, { useEffect, useState } from 'react'

import MangoToken from '../../abis/MangoToken'

import connector from "../../lib/connector"

import * as Styles from './styles'

function StakedBalance({ wallet }) {
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
  
  useEffect(async () => {
    await loadData()
  }, [])
  
  const convertedBalance = window.web3.utils.fromWei(balance.toString(), 'Ether')

  return (
    <Styles.Container>
      Available MNGO Balance: {convertedBalance} MNGO
    </Styles.Container>
  )
}

export default connector(['wallet'])(StakedBalance)