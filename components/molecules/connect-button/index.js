import React, { useEffect, useContext, useState } from 'react';

import { MNGO } from 'components/molecules/coin/constants';

import connector from 'lib/connector';
import { WalletConnectionContext } from 'lib/wallet-connection';
import { MANGO_TOKEN } from 'lib/smart-contracts';

import { bnToNumber } from 'utils/number';

import * as Styles from './styles';

const BALANCE_REFRESH_TIME = 5000;

function ConnectButton({ wallet, walletActions }) {
  const {
    account,
    balances,
  } = wallet;
  const walletConnection = useContext(WalletConnectionContext);

  const onConnect = async () => {
    await walletConnection.connect();
  };

  const updateMangoBalance = async () => {
    if (account && walletConnection.contracts[MANGO_TOKEN]) {
      const result = await walletConnection.contracts[MANGO_TOKEN].balanceOf(wallet.account).call();

      walletActions.setBalance(MNGO, result.toString());
    }
  };

  useEffect(() => {
    updateMangoBalance();

    const interval = setInterval(async () => {
      updateMangoBalance();
    }, BALANCE_REFRESH_TIME);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Styles.Container>
      {account ? (
        <Styles.Address href={`https://etherscan.io/address/${account}`} target="new" title={account}>
          <Styles.Avatar src="/img/lemon-avatar.png" width={32} height={32} />
          <Styles.AccountInfo>
            <Styles.AccountNumber>
              {account.slice(0, 10)}
              …
              {account.slice(-4)}
            </Styles.AccountNumber>
            <div>
              <strong>{balances[MNGO] ? bnToNumber(balances[MNGO]).toFormat() : 0}</strong>
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
}

export default connector(['wallet'], ['wallet'])(ConnectButton);
