import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import { MNGO } from 'components/molecules/coin/constants';

import connector from 'lib/connector';
import { WalletConnectionContext } from 'lib/wallet-connection';
import { MANGO_TOKEN } from 'lib/smart-contracts';

import { bnToNumber } from 'utils/number';

import * as Styles from './styles';

const BALANCE_REFRESH_TIME = 5000;

const ConnectButton = ({ wallet, walletActions, onClick }) => {
  const {
    account,
    balances,
  } = wallet;
  const walletConnection = useContext(WalletConnectionContext);
  const [balanceInterval, setBalanceInterval] = useState(null);
  const [polledAccount, setPolledAccount] = useState(null);

  const onConnect = async () => {
    await walletConnection.connect();
  };

  const updateMangoBalance = async () => {
    if (account && walletConnection.contracts[MANGO_TOKEN]) {
      const result = await walletConnection.contracts[MANGO_TOKEN].balanceOf(
        wallet.account,
      ).call().catch((e) => {
        console.error(e);
      });

      walletActions.setBalance(MNGO, result.toString());
    }
  };

  useEffect(() => {
    updateMangoBalance();
  }, []);

  const stopBalancePolling = () => {
    clearInterval(balanceInterval);
    setBalanceInterval(null);
  };

  const startBalancePolling = () => {
    setBalanceInterval(setInterval(async () => {
      await updateMangoBalance();
    }, BALANCE_REFRESH_TIME));
  };

  useEffect(() => {
    if (account) {
      if (polledAccount !== account) {
        setPolledAccount(account);

        if (balanceInterval) {
          stopBalancePolling();
        }
        startBalancePolling();
      } else if (!balanceInterval) {
        startBalancePolling();
      }
    } else {
      stopBalancePolling();
    }
  }, [account]);

  return (
    <Styles.Container>
      {account ? (
        <Styles.Address onClick={onClick}>
          <Styles.Avatar src="/img/lemon-avatar.png" width={32} height={32} />
          <Styles.AccountInfo>
            <Styles.AccountNumber>
              {account.slice(0, 10)}
              …
              {account.slice(-4)}
            </Styles.AccountNumber>
            <div>
              <strong>{balances[MNGO] ? bnToNumber(balances[MNGO]).toFormat() : '---'}</strong>
              {' '}
              <small>MNGO</small>
            </div>
          </Styles.AccountInfo>
        </Styles.Address>
      ) : (
        <Styles.ConnectBtn className="btn btn-primary btn-lg btn-block" onClick={onConnect}>
          Connect Wallet
        </Styles.ConnectBtn>
      )}
    </Styles.Container>
  );
};

ConnectButton.propTypes = {
  onClick: PropTypes.func,
};

ConnectButton.defaultProps = {
  onClick: () => {},
};

export default connector(['wallet'], ['wallet'])(ConnectButton);
