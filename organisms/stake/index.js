import React, { useEffect, useState, useContext } from 'react'
import { Card, Button } from "react-bootstrap"

import MangoToken from '../../abis/MangoToken'
import Amount from "../../molecules/amount"
import InputButton from "../../molecules/input-button"
import connector from "../../lib/connector"
import {asNumber, asEther} from "../../lib/number"
import {WalletConnectionContext} from "../../lib/wallet-connection"

import * as Styles from './styles'

function Stake({ wallet }) {
  const [balance, setBalance] = useState(0)
  const walletConnection = useContext(WalletConnectionContext)
  
  useEffect(async () => {
    
  }, [wallet.account])

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          Your Staked Balance
        </Card.Title>
        <Card.Text>
          <Amount>{asNumber(asEther(balance), {precision: 0})}</Amount>
        </Card.Text>
      </Card.Body>
      <Card.Body>
        <Card.Title>
          Amount to Stake
        </Card.Title>
        <Card.Text>
          <InputButton color="#61ce70" placeholder="MNGO to stake" text="All" />
          <Button variant="success" className="mt-2" block>
            Stake
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default connector(['wallet'])(Stake)