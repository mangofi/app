import React from 'react';
import { Container } from 'react-bootstrap';

import PageContent from '../atoms/page-content';

import Coin from '../molecules/coin';
import { MNGO } from '../molecules/coin/constants';
import PoolCard from '../molecules/pool-card';

import Sidebar from '../organisms/sidebar';

const Home = () => (
  <Container fluid className="p-0 w-100 mt-3">
    <div style={{
      paddingLeft: 114, paddingRight: 114, display: 'flex', flexDirection: 'row',
    }}
    >
      <Sidebar currentPage="/pools" />
      <PageContent>
        <h4>Pools 🌴</h4>
        <div>
          Stake MNGO to earn new tokens. You can unstake at any time.
          <p>
            Rewards are calculated per block
          </p>
        </div>
        <div>
          <PoolCard token={MNGO} verified apr="138.62%">
            This is my first pool card
          </PoolCard>
        </div>
      </PageContent>
    </div>
  </Container>
);

export default Home;
