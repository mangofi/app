import React, { useEffect, useState, useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import BigNumber from 'bignumber.js';

import MangoToken from 'abis/MangoToken';

import Amount from 'components/molecules/amount';
import InputButton from 'components/molecules/input-button';

import connector from 'lib/connector';
import { asNumber, asEther } from 'lib/number';
import { WalletConnectionContext } from 'lib/wallet-connection';

import * as Styles from './styles';

function Stake({ wallet }) {
  const [stakedBalance, setStakedBalance] = useState(0);
  const [amountToStake, setAmountToStake] = useState('');
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

      const userInfo = await mangoToken.methods.users(0, wallet.account).call();

      if (userInfo.amount) {
        setStakedBalance(userInfo.amount);
      } else {
        setStakedBalance(0);
      }
    } else {
      setStakedBalance(0);
    }
  };

  const onStakeClick = async () => {
    const networkId = await walletConnection.getNetworkId();

    if (!networkId) {
      return;
    }

    const networkData = MangoToken.networks[networkId];
    if (networkData && networkData.address) {
      const mangoToken = walletConnection.buildContract(MangoToken.abi, networkData.address);
      const amountAsNumber = new BigNumber(amountToStake).multipliedBy(new BigNumber(10).pow(18)).toNumber();

      await mangoToken.methods.stake(amountAsNumber.toString()).call({ from: wallet.account });

      setStakedBalance(stakedBalance + amountAsNumber);
      setAmountToStake('');
    } else {
      setAmountToStake('');
    }
  };

  const onApproveClick = async () => {
    const networkId = await walletConnection.getNetworkId();

    if (!networkId) {
      return;
    }

    const networkData = MangoToken.networks[networkId];
    if (networkData && networkData.address) {
      const mangoToken = walletConnection.buildContract(MangoToken.abi, networkData.address);

      console.log('approving...');
      await mangoToken.methods.allowance(networkData.address, wallet.account).call();
      console.log('approved!');
    }
  };

  const onStakeChange = (event) => {
    const { value } = event.target;
    setAmountToStake(value);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>
          Your Staked Balance
        </Card.Title>
        <Card.Text>
          <Amount>{asNumber(asEther(stakedBalance), { precision: 0 })}</Amount>
        </Card.Text>
      </Card.Body>
      <Card.Body>
        <Card.Title>
          Amount to Stake
        </Card.Title>
        <Card.Text>
          <InputButton
            color="#61ce70"
            onChange={onStakeChange}
            placeholder="MNGO to stake"
            text="All"
            value={amountToStake}
          />
          <Button
            variant="success"
            className="mt-2"
            block
            onClick={onApproveClick}
          >
            Approve
          </Button>
          <Button
            variant="success"
            className="mt-2"
            block
            onClick={onStakeClick}
          >
            Stake
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default connector(['wallet'])(Stake);
