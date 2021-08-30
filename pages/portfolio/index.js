import React, { useEffect, useState } from 'react';

import Page from 'components/organisms/page';

import EthBalance from './containers/eth-balance';

const Portfolio = () => {
  const [bscBalance, setBscBalance] = useState(null);

  return (
    <Page currentPage="/portfolio">
      <h4 style={{ position: 'relative' }}>
        Portfolio 🧳
        <img src="/img/deco-1.svg" style={{ position: 'absolute', right: 0, top: 0 }} alt="mango decoration" />
      </h4>
      <div>
        Take a look at your portfolio
      </div>
      <EthBalance />
    </Page>
  );
};

export default Portfolio;
