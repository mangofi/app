import React from 'react';

import { MNGO } from '../molecules/coin/constants';
import PoolCard from '../molecules/pool-card';

import Page from '../organisms/page';

const Home = () => (
  <Page currentPage="/pools">
    <h4>Pools 🌴</h4>
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
        tokenEarnings={[
          {
            earnings: '1.000',
            usdEarnings: '~0.010',
            token: MNGO,
          },
        ]}
      />
    </div>
  </Page>
);

export default Home;
