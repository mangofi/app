import React, { useEffect, useState } from 'react';

import Page from 'components/organisms/page';

import EthBalance from './containers/eth-balance';
import BnbBalance from './containers/bnb-balance';

const Portfolio = () => (
  <Page currentPage="/portfolio">
    <h4 style={{ position: 'relative' }}>
      Portfolio 🧳
      <img src="/img/deco-1.svg" style={{ position: 'absolute', right: 0, top: 0 }} alt="mango decoration" />
    </h4>
    <div>
      Take a look at your portfolio
    </div>
    <EthBalance />
    <BnbBalance />
  </Page>
);

export default Portfolio;
