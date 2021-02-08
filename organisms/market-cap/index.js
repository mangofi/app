import React, { useEffect, useState, useContext } from 'react'
import { Card } from "react-bootstrap"
import CoinGecko from 'coingecko-api'

import MangoToken from '../../abis/MangoToken'
import Amount from "../../molecules/amount"
import connector from "../../lib/connector"
import {asMoney, asNumber, asEther} from "../../lib/number"
import {WalletConnectionContext} from "../../lib/wallet-connection"

import * as Styles from './styles'

const CoinGeckoClient = new CoinGecko()

const COIN_NAME = 'ethereum'

function MarketCap({ wallet }) {
  const [marketCap, setMarketCap] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)
  const walletConnection = useContext(WalletConnectionContext)
  
  useEffect(async () => {
    await loadMarketCap()
    await loadTotalSupply()
  }, [wallet.account])

  const loadTotalSupply = async () => {
    const networkId = await walletConnection.getNetworkId()
    
    if (!networkId) {
      return
    }

    const networkData = MangoToken.networks[networkId]
    
    if (networkData && networkData.address) {
      const mangoToken = walletConnection.buildContract(MangoToken.abi, networkData.address)
      const supply = await mangoToken.methods.totalSupply().call()
    
      setTotalSupply(supply)
    }
  }
  
  const loadMarketCap = async () => {
    const result = await CoinGeckoClient.coins.fetch(COIN_NAME);
    
    if (result.data) {
      setMarketCap(result.data.market_data.market_cap.usd)
    }
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          Market Cap
        </Card.Title>
        <Card.Text>
          <Amount currency='USD'>{marketCap ? asMoney(marketCap, {precision: 0}) : "--"}</Amount>
        </Card.Text>
      </Card.Body>
      <Card.Body>
        <Card.Text>
          Total Supply: {asNumber(asEther(totalSupply), {precision: 0})} MNGO
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default connector(['wallet'])(MarketCap)