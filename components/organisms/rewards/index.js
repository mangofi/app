import React, { useEffect, useState, useContext } from 'react';
import { Card, Button } from 'react-bootstrap';

import MangoToken from 'abis/MangoToken';

import Amount from 'components/molecules/amount';
import InputButton from 'components/molecules/input-button';

import connector from 'lib/connector';
import { asNumber, asEther } from 'lib/number';
import { WalletConnectionContext } from 'lib/wallet-connection';

import * as Styles from './styles';

function Rewards({ wallet }) {
  const [balance, setBalance] = useState(0);
  const walletConnection = useContext(WalletConnectionContext);

  useEffect(async () => {

  }, [wallet.account]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          Your Rewards
        </Card.Title>
        <Card.Text>
          <Amount>{asNumber(asEther(balance), { precision: 0 })}</Amount>
        </Card.Text>
      </Card.Body>
      <Card.Body>
        <Card.Title>
          Amount to Unstake
        </Card.Title>
        <Card.Text>
          <InputButton color="#ff5689" placeholder="MNGO to unstake" text="All" />
          <Button variant="danger" className="mt-2" block>
            Withdraw
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default connector(['wallet'])(Rewards);
