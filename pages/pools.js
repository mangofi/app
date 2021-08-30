import React from 'react';

import { MNGO } from 'components/molecules/coin/constants';

import Page from 'components/organisms/page';

import PoolCardContainer from 'containers/organisms/pool-card-container';

import { MANGO_TOKEN, MANGO_TREE } from 'lib/smart-contracts';

const Pools = () => (
  <Page currentPage="/pools">
    <h4 style={{ position: 'relative' }}>
      Pools 🌴
      <img src="/img/deco-1.svg" style={{ position: 'absolute', right: 0, top: 0 }} alt="mango decoration" />
    </h4>
    <div>
      Stake MNGO to earn new tokens. You can unstake at any time.
      <p>
        Rewards are calculated per block
      </p>
    </div>
    <div>
      <PoolCardContainer
        smartContract={MANGO_TOKEN}
        stakingSmartContract={MANGO_TREE}
        token={MNGO}
        verified
      />
    </div>
  </Page>
);

export default Pools;
