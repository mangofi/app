import React, {
  useContext, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';

import Button from 'components/atoms/button';
import CloseButton from 'components/atoms/close-button';

import Modal from 'components/molecules/modal';

import PoolCard from 'components/organisms/pool-card';
import StakeTokenModal from 'components/organisms/stake-token-modal';
import UnstakeTokenModal from 'components/organisms/unstake-token-modal';

import connector from 'lib/connector';
import { WalletConnectionContext } from 'lib/wallet-connection';

import { asToken } from 'utils/number';

const PoolCardContainer = ({
  token, smartContract, stakingSmartContract, verified, wallet, poolId,
}) => {
  const walletConnection = useContext(WalletConnectionContext);
  const [apr, setApr] = useState(null);
  const [approved, setApproved] = useState(false);
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [showUnstakeModal, setShowUnstakeModal] = useState(false);
  const [balance, setBalance] = useState(0);

  const checkTokenAllowance = async () => {
    if (walletConnection.contracts[smartContract]) {
      const allowance = await walletConnection.contracts[smartContract].allowance(
        wallet.account,
        walletConnection.contracts[stakingSmartContract].address,
      ).call();

      setApproved(allowance > 0);
    }
  };

  const getEarnedTokens = async () => {
    if (walletConnection.contracts[smartContract]) {
      const result = await walletConnection.contracts[stakingSmartContract].pendingMango(0, wallet.account).call();
      const earnings = parseFloat(result);

      setStakedToken((prevState) => ({
        ...prevState,
        disabled: approved && earnings > 0,
        earnings,
      }));
    }
  };

  const getStakedTokens = async () => {
    if (walletConnection.contracts[smartContract]) {
      const result = await walletConnection.contracts[stakingSmartContract].userInfo(0, wallet.account).call();
      const poolStaking = result[poolId];

      setStakedToken((prevState) => ({
        ...prevState,
        disabled: false,
        earnings: poolStaking,
        empty: parseFloat(poolStaking) === 0,
      }));
    }
  };

  const onEnable = async () => {
    const result = await walletConnection.contracts[smartContract].approve(walletConnection.contracts[stakingSmartContract].address, '115792089237316195423570985008687907853269984665640564039457584007913129639935').send({ from: wallet.account });

    setApproved(result.status);
  };

  const onStake = async (amount) => {
    const result = await walletConnection.contracts[stakingSmartContract].enterStaking(amount).send({
      from: wallet.account,
    });

    getStakedTokens();
    hideStakeModal();
  };

  const onUnstake = async (amount) => {
    const result = await walletConnection.contracts[stakingSmartContract].leaveStaking(amount).send({
      from: wallet.account,
    });

    getStakedTokens();
    hideUnstakeModal();
  };

  const getBalance = async () => {
    if (!walletConnection.contracts[smartContract]) return;
    const result = await walletConnection.contracts[smartContract].balanceOf(wallet.account).call();

    setBalance(result);
  };

  const displayStakeModal = () => {
    setShowStakeModal(true);
  };

  const hideStakeModal = () => {
    setShowStakeModal(false);
  };

  const displayUnstakeModal = () => {
    setShowUnstakeModal(true);
  };

  const hideUnstakeModal = () => {
    setShowUnstakeModal(false);
  };

  const [earnedToken, setEarnedToken] = useState({
    earnings: 0.0,
    disabled: !approved,
    usdEarnings: '~0.000',
    empty: false,
    token,
    stake: false,
    onTokenBalanceClick: () => { console.log('TODO: Collect'); },
  });
  const [stakedToken, setStakedToken] = useState({
    earnings: 0.0,
    disabled: !approved,
    usdEarnings: '~0.000',
    empty: true,
    token,
    staked: true,
    onTokenBalanceClick: displayStakeModal,
  });

  useEffect(async () => {
    if (wallet.networkId) {
      await checkTokenAllowance();

      if (wallet.account) {
        await getEarnedTokens();
        await getStakedTokens();
        await getBalance();
      }
    }
  }, [wallet.networkId, wallet.account]);

  return (
    <>
      <PoolCard
        approved={approved}
        canUnstake={stakedToken.earnings > 0}
        token={token}
        smartContract={smartContract}
        verified={verified}
        apr={apr && `${apr}%`}
        tokenEarnings={[earnedToken, stakedToken]}
        onEnable={onEnable}
        onStake={displayStakeModal}
        onUnstake={displayUnstakeModal}
      />
      <StakeTokenModal
        balance={balance}
        token={token}
        show={showStakeModal}
        onHide={hideStakeModal}
        onStake={onStake}
        onBuy={() => console.log('TODO: onBuy')}
      />
      <UnstakeTokenModal
        balance={balance}
        token={token}
        show={showUnstakeModal}
        onHide={hideUnstakeModal}
        onUnstake={onUnstake}
      />
    </>
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
