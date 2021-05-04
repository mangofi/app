import React, { useContext, useState, useEffect } from 'react';

import { MNGO } from '../molecules/coin/constants';

import Page from '../organisms/page';
import PoolCard from '../organisms/pool-card';

import connector from '../lib/connector';
import { WalletConnectionContext } from '../lib/wallet-connection';

const Home = ({ wallet }) => {
  const walletConnection = useContext(WalletConnectionContext);
  const [approved, setApproved] = useState(false);

  useEffect(async () => {
    if (walletConnection.contracts.MANGO_TOKEN) {
      const result = await walletConnection.contracts.MANGO_TOKEN.allowance(wallet.account, walletConnection.contracts.MANGO_TOKEN.address).call();

      setApproved(result > 0);
    }
  }, [wallet.networkId, wallet.account]);

  return (
    <Page currentPage="/pools">
      <h4 style={{ position: 'relative' }}>
        Pools 🌴
        <img src="/img/deco-1.svg" style={{ position: 'absolute', right: 0, top: 0 }} />
      </h4>
      <div>
        Stake MNGO to earn new tokens. You can unstake at any time.
        <p>
          Rewards are calculated per block
        </p>
      </div>
      <div>
        <PoolCard
          token={MNGO}
          verified
          apr="138.62%"
          approved={approved}
          tokenEarnings={[
            {
              earnings: '1.000',
              usdEarnings: '~0.010',
              empty: false,
              token: MNGO,
              stake: false,
            },
            {
              earnings: '1.000',
              usdEarnings: '~0.010',
              empty: true,
              token: MNGO,
              staked: true,
            },
          ]}
          onEnable={async () => {
            const result = await walletConnection.contracts.MANGO_TOKEN.approve(walletConnection.contracts.MANGO_TOKEN.address, 100000000000000).send({ from: wallet.account });

            setApproved(result.status);
          }}
        />
      </div>
    </Page>
  );
};

export default connector(['wallet'], ['wallet'])(Home);
