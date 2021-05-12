import React, { useEffect, useContext } from 'react';

import connector from 'lib/connector';
import { WalletConnectionContext } from 'lib/wallet-connection';
import { MANGO_TOKEN } from 'lib/smart-contracts';

import { asToken } from 'utils/number';

import * as Styles from './styles';

function ConnectButton({ wallet, walletActions }) {
  const {
    account,
    signedIn,
    balance,
  } = wallet;
  const walletConnection = useContext(WalletConnectionContext);

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
    if (wallet.account) {
      loadBalance();
    }
  }, [wallet.networkId, wallet.account]);

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
              <strong>{asToken(balance)}</strong>
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
