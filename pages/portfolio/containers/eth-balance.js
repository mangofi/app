import React, {
  useEffect, useState, useCallback,
} from 'react';
import Etherscan from 'etherscan-api';

import connector from 'lib/connector';

import { asToken } from 'utils/number';

const EtherscanApi = Etherscan.init(process.env.ETHERSCAN_API_KEY);

const EthBalance = ({ wallet }) => {
  const [ethBalance, setEthBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadBalances = useCallback(() => {
    setLoading(true);

    EtherscanApi.account.balance(wallet.account).then((data) => {
      setEthBalance(data.result);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [wallet.account]);

  const renderValue = useCallback(() => {
    if (loading) {
      return 'Loading...';
    }

    return ethBalance ? `${asToken(ethBalance)} ETH` : '';
  }, [ethBalance, loading]);

  useEffect(() => {
    if (wallet.account) {
      loadBalances();
    }
  }, [wallet.account]);

  return (
    <div>
      ETH Balance:
      {' '}
      {renderValue()}
    </div>
  );
};

export default connector(['wallet'], ['wallet'])(EthBalance);
