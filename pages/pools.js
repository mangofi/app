import React from 'react';
import { Container } from 'react-bootstrap';

import PageContent from '../atoms/page-content';

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
      </PageContent>
    </div>
  </Container>
);

export default Home;
