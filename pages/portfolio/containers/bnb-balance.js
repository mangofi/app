import React, {
  useEffect, useState, useCallback,
} from 'react';

import connector from 'lib/connector';

import { asToken } from 'utils/number';

const BSCSCAN_API_KEY = process.env.NEXT_PUBLIC_BSCSCAN_API_KEY;

const BnbBalance = ({ wallet }) => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadBalance = useCallback(() => {
    setLoading(true);

    fetch(`https://api.bscscan.com/api?module=account&action=balance&address=${wallet.account}&tag=latest&apikey=${BSCSCAN_API_KEY}`).then(async (response) => {
      const json = await response.json();

      setLoading(false);
      setBalance(json.result);
    }).catch((error) => {
      setLoading(false);
      console.warn('Error requesting BSCScan:', error);
    });
  }, [wallet.account]);

  const renderValue = useCallback(() => {
    if (loading) {
      return 'Loading...';
    }

    return balance ? `${asToken(balance)} BNB` : '';
  }, [balance, loading]);

  useEffect(() => {
    if (wallet.account) {
      loadBalance();
    }
  }, [wallet.account]);

  return (
    <div>
      BNB Balance:
      {' '}
      {renderValue()}
    </div>
  );
};

export default connector(['wallet'], ['wallet'])(BnbBalance);
