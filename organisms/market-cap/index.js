import React, { useEffect, useState } from 'react'
import { Card } from "react-bootstrap"
import CoinGecko from 'coingecko-api'

import MangoToken from '../../abis/MangoToken'
import Amount from "../../molecules/amount"
import connector from "../../lib/connector"
import {asMoney, asNumber} from "../../lib/number"

import * as Styles from './styles'

const CoinGeckoClient = new CoinGecko()

const COIN_NAME = 'ethereum'

function MarketCap({ wallet }) {
  const isBrowser = (typeof window !== "undefined");
  const [marketCap, setMarketCap] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)

  const loadTotalSupply = async () => {
    const networkId = await window.web3.eth.net.getId()
    const networkData = MangoToken.networks[networkId]

    if (networkData) {
      const mangoToken = new web3.eth.Contract(MangoToken.abi, networkData.address)
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
      return window.web3.utils.fromWei(totalSupply.toString(), 'Ether')
    }
    
    return totalSupply
  }
  
  useEffect(async () => {
    await loadMarketCap()
  }, [])

  useEffect(async () => {
    if (wallet.account) {
      await loadTotalSupply()
    }
  }, [wallet.account, wallet.signedIn])

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