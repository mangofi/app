import React, { useState, useEffect, useContext } from 'react';

import connector from '../../lib/connector';
import { WalletConnectionContext } from '../../lib/wallet-connection';

import * as Styles from './styles';

function ConnectButton({ wallet, walletActions }) {
  const {
    account,
    signedIn,
  } = wallet;
  const walletConnection = useContext(WalletConnectionContext);

  const onConnect = async () => {
    await walletConnection.connect();
  };

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
              <strong>10,472.0000</strong>
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
