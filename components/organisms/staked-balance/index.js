import React, { useEffect, useState, useContext } from 'react';
import { Card } from 'react-bootstrap';

import MangoToken from 'abis/MangoToken';

import Amount from 'components/molecules/amount';

import connector from 'lib/connector';
import { asNumber, asEther } from 'lib/number';
import { WalletConnectionContext } from 'lib/wallet-connection';

import * as Styles from './styles';

function StakedBalance({ wallet }) {
  const [stakedBalance, setStakedBalance] = useState(0);
  const walletConnection = useContext(WalletConnectionContext);

  useEffect(async () => {
    if (wallet.account) {
      await loadBalance();
    } else {
      setStakedBalance(0);
    }
  }, [wallet.account]);

  const loadBalance = async () => {
    const networkId = await walletConnection.getNetworkId();

    if (!networkId) {
      return;
    }

    const networkData = MangoToken.networks[networkId];
    if (networkData && networkData.address) {
      const mangoToken = walletConnection.buildContract(MangoToken.abi, networkData.address);

      const userInfo = await mangoToken.methods.stakedBalance().call({ from: wallet.account });

      setStakedBalance(userInfo);
    } else {
      setStakedBalance(0);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          Total Staked Balance
        </Card.Title>
        <Card.Text>
          <Amount>{asNumber(asEther(stakedBalance), { precision: 0 })}</Amount>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default connector(['wallet'])(StakedBalance);
