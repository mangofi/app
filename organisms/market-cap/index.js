import React, { useEffect, useState } from 'react'
import { Card } from "react-bootstrap"
import CoinGecko from 'coingecko-api'

import MangoToken from '../../abis/MangoToken'
import Amount from "../../molecules/amount"
import connector from "../../lib/connector"
import {asMoney, asNumber, asEther} from "../../lib/number"
import useWalletConnection from '../../lib/use-wallet-connection'

import * as Styles from './styles'

const CoinGeckoClient = new CoinGecko()

const COIN_NAME = 'ethereum'

function MarketCap({ wallet }) {
  const isBrowser = (typeof window !== "undefined");
  const [marketCap, setMarketCap] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)
  const walletConnection = useWalletConnection()

  const loadTotalSupply = async () => {
    const networkId = await walletConnection.getNetworkId()
    const networkData = MangoToken.networks[networkId]

    if (networkData) {
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
  
  const convertedTotalSupply = () => {
    if (isBrowser && wallet.signedIn) {
      return asEther(totalSupply)
    }
    
    return totalSupply
  }
  
  useEffect(async () => {
    await loadMarketCap()
  }, [])
  useEffect(async () => {
    if (walletConnection) {
      await loadTotalSupply()
    }
  }, [walletConnection])

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
      <Card.Footer>
        Total Supply: {asNumber(convertedTotalSupply(), {precision: 0})} MNGO
      </Card.Footer>
    </Card>
  )
}

export default connector(['wallet'])(MarketCap)