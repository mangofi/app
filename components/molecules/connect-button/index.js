import React, { useEffect, useContext, useState } from 'react';

import connector from 'lib/connector';
import { WalletConnectionContext } from 'lib/wallet-connection';
import { MANGO_TOKEN } from 'lib/smart-contracts';

import { bnToNumber } from 'utils/number';

import * as Styles from './styles';

const BALANCE_REFRESH_TIME = 2000;

function ConnectButton({ wallet, walletActions }) {
  const {
    account,
    signedIn,
    balance,
  } = wallet;
  const walletConnection = useContext(WalletConnectionContext);
  const [refreshBalance, setRefreshBalance] = useState(false);

  const onConnect = async () => {
    await walletConnection.connect();
  };

  const loadBalance = async () => {
    if (walletConnection.contracts[MANGO_TOKEN]) {
      const result = await walletConnection.contracts[MANGO_TOKEN].balanceOf(wallet.account).call();

      walletActions.setBalance(result.toString());
    }
  };

  useEffect(() => {
    if (wallet.account) loadBalance();
  }, [wallet.networkId, wallet.account]);

  useEffect(() => {
    let interval = null;
    if (!refreshBalance) {
      setRefreshBalance(true);
      interval = setInterval(async () => {
        if (wallet.networkId && wallet.account) {
          loadBalance();
        }
      }, BALANCE_REFRESH_TIME);
    }
    return () => {
      setRefreshBalance(false);
      if (interval) clearInterval(interval);
    };
  });

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
              <strong>{bnToNumber(balance).toString()}</strong>
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
