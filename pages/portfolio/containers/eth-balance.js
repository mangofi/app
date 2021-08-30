import React, {
  useEffect, useState, useCallback,
} from 'react';
import Etherscan from 'etherscan-api';

import connector from 'lib/connector';

import { asToken } from 'utils/number';

const EtherscanApi = Etherscan.init(process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY);

const EthBalance = ({ wallet }) => {
  const [ethBalance, setEthBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadBalance = useCallback(() => {
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
      loadBalance();
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
