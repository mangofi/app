import React, {
  useContext, useCallback, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';

import PoolCard from 'components/organisms/pool-card';

import connector from 'lib/connector';
import { WalletConnectionContext } from 'lib/wallet-connection';

const PoolCardContainer = ({
  token, smartContract, stakingSmartContract, verified, wallet, poolId,
}) => {
  const walletConnection = useContext(WalletConnectionContext);
  const [approved, setApproved] = useState(false);

  useEffect(async () => {
    checkTokenAllowance();
    getEarnedTokens();
    getStakedTokens();
  }, [wallet.networkId, wallet.account]);

  const checkTokenAllowance = async () => {
    if (walletConnection.contracts[smartContract]) {
      const result = await walletConnection.contracts[smartContract].allowance(wallet.account, walletConnection.contracts[stakingSmartContract].address).call();

      setApproved(result > 0);
    }
  };

  const getEarnedTokens = async () => {
    if (walletConnection.contracts[smartContract]) {
      const result = await walletConnection.contracts[stakingSmartContract].pendingMango(0, wallet.account).call();

      const earnings = parseFloat(result);
      setStakedToken({
        ...stakedToken,
        earnings,
      });
    }
  };

  const getStakedTokens = async () => {
    if (walletConnection.contracts[smartContract]) {
      const result = await walletConnection.contracts[stakingSmartContract].userInfo(0, wallet.account).call();

      setStakedToken({
        ...stakedToken,
        earnings: result[poolId],
        empty: parseFloat(result[poolId]) === 0,
      });
    }
  };

  const onEnable = async () => {
    const result = await walletConnection.contracts[smartContract].approve(walletConnection.contracts[stakingSmartContract].address, '115792089237316195423570985008687907853269984665640564039457584007913129639935').send({ from: wallet.account });

    setApproved(result.status);
  };

  const onStake = async () => {
    const result = await walletConnection.contracts[stakingSmartContract].enterStaking(1).send({ from: wallet.account, gas: 200000 });

    getStakedTokens();
  };

  const onUnstake = async () => {
    const result = await walletConnection.contracts[stakingSmartContract].leaveStaking(1).send({ from: wallet.account, gas: 200000 });

    getStakedTokens();
  };

  const [earnedToken, setEarnedToken] = useState({
    earnings: 0.0,
    usdEarnings: '~0.000',
    empty: false,
    token,
    stake: false,
  });
  const [stakedToken, setStakedToken] = useState({
    earnings: 0.0,
    usdEarnings: '~0.000',
    empty: true,
    token,
    staked: true,
    onClick: onStake,
  });
  const [apr, setApr] = useState(null);

  return (
    <PoolCard
      approved={approved}
      canUnstake={stakedToken.earnings > 0}
      token={token}
      smartContract={smartContract}
      verified={verified}
      apr={apr && `${apr}%`}
      tokenEarnings={[earnedToken, stakedToken]}
      onEnable={onEnable}
      onStake={onStake}
      onUnstake={onUnstake}
    />
  );
};

PoolCardContainer.propTypes = {
  token: PropTypes.string.isRequired,
  smartContract: PropTypes.string.isRequired,
  stakingSmartContract: PropTypes.string.isRequired,
  verified: PropTypes.bool,
  poolId: PropTypes.number,
};

PoolCardContainer.defaultProps = {
  verified: false,
  poolId: 0,
};

export default connector(['wallet'], ['wallet'])(PoolCardContainer);
