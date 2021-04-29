import React from 'react';
import { Container } from 'react-bootstrap';

import Sidebar from '../organisms/sidebar';

const Home = () => (
  <Container fluid className="p-0 w-100 mt-3">
    <div style={{
      paddingLeft: 114, paddingRight: 114, display: 'flex', flexDirection: 'row',
    }}
    >
      <Sidebar currentPage="/pools" />
      <div className="d-flex flex-fill flex-column">
        <h4>Pools 🌴</h4>
        <div>
          Stake MNGO to earn new tokens. You can unstake at any time.
          <p>
            Rewards are calculated per block
          </p>
        </div>
      </div>
    </div>
  </Container>
);

export default Home;
