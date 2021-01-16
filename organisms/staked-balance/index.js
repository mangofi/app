import React, { useEffect, useState } from 'react'
import { Card } from "react-bootstrap"

import MangoToken from '../../abis/MangoToken'
import Amount from "../../molecules/amount"
import connector from "../../lib/connector"
import {asNumber, asEther} from "../../lib/number"
import useWalletConnection from '../../lib/use-wallet-connection'

import * as Styles from './styles'

function StakedBalance({ wallet }) {
  const isBrowser = (typeof window !== "undefined");
  const [balance, setBalance] = useState(0)
  const walletConnection = useWalletConnection()

  const loadData = async () => {
    const networkId = await walletConnection.getNetworkId()
    const networkData = MangoToken.networks[networkId]
    if (networkData) {
      const mangoToken = walletConnection.buildContract(MangoToken.abi, networkData.address)

      const balanceOf = await mangoToken.methods.balanceOf(wallet.account).call()
      setBalance(balanceOf)
    }
  }
  
  const convertedBalance = () => {
    if (isBrowser && wallet.signedIn) {
      return asEther(balance)
    }
    
    return balance
  }
  
  useEffect(async () => {
    if (wallet.account && walletConnection) {
      await loadData()
    } else {
      setBalance(0)
    }
  }, [wallet.account, wallet.signedIn, walletConnection])

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          Available MNGO Balance
        </Card.Title>
        <Card.Text>
          <Amount>{asNumber(convertedBalance(), {precision: 0})}</Amount>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default connector(['wallet'])(StakedBalance)