import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import CoinGecko from 'coingecko-api';

import MangoToken from 'abis/MangoToken';
import Amount from 'components/molecules/amount';
import { asMoney, asNumber } from 'lib/number';

import * as Styles from './styles';

const CoinGeckoClient = new CoinGecko();

const COINS_NAME = {
  tether: 'USDT',
  ethereum: 'ETH',
  dai: 'DAI',
};

function Prices({ wallet }) {
  const isBrowser = (typeof window !== 'undefined');
  const [coins, setCoins] = useState([]);

  const loadCoins = async () => {
    const prices = await CoinGeckoClient.simple.price({
      ids: ['mango', 'ethereum', 'dai', 'tether'],
      vs_currencies: ['usd'],
    });

    if (prices.data) {
      Object.keys(prices.data).forEach((coinName) => {
        setCoins((previousCoins) => [
          ...previousCoins,
          {
            name: coinName,
            title: COINS_NAME[coinName],
            price: prices.data[coinName].usd,
          },
        ]);
      });
    }
  };

  useEffect(async () => {
    if (coins.length === 0) {
      await loadCoins();
    }
  }, []);

  const renderCoin = (coin) => (
    <Styles.Coin>
      <Styles.CoinIconContainer />
      <Styles.CoinName>
        {coin.title}
        :
      </Styles.CoinName>
      <Styles.CoinPrice>
        {asMoney(coin.price)}
      </Styles.CoinPrice>
    </Styles.Coin>
  );

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          Prices
        </Card.Title>
        <Card.Text>
          {coins.map((coin) => renderCoin(coin))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Prices;
