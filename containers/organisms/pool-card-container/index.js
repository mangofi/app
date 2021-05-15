import React, {
  useContext, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';

import Button from 'components/atoms/button';
import CloseButton from 'components/atoms/close-button';

import Modal from 'components/molecules/modal';

import PoolCard from 'components/organisms/pool-card';
import StakeTokenModal from 'components/organisms/stake-token-modal';
import UnstakeTokenModal from 'components/organisms/unstake-token-modal';

import connector from 'lib/connector';
import { WalletConnectionContext } from 'lib/wallet-connection';

import { numberToBN, bnToNumber } from 'utils/number';

const PoolCardContainer = ({
  token, smartContract, stakingSmartContract, verified, wallet, poolId,
}) => {
  const walletConnection = useContext(WalletConnectionContext);
  const [apr, setApr] = useState(null);
  const [approved, setApproved] = useState(false);
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [showUnstakeModal, setShowUnstakeModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const [loadingStaking, setLoadingStaking] = useState(false);
  const [loadingUnstaking, setLoadingUnstaking] = useState(false);
  const [loadingApprove, setLoadingApprove] = useState(false);

  const checkTokenAllowance = async () => {
    if (walletConnection.contracts[smartContract]) {
      try {
        const allowance = await walletConnection.contracts[smartContract].allowance(
          wallet.account,
          walletConnection.contracts[stakingSmartContract].address,
        ).call();

        setApproved(allowance > 0);
        setLoadingApprove(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const getEarnedTokens = async () => {
    if (walletConnection.contracts[stakingSmartContract]) {
      try {
        const result = await walletConnection.contracts[stakingSmartContract].pendingMango(0, wallet.account).call();
        const earnings = bnToNumber(result).toString();

        setEarnedToken((prevState) => ({
          ...prevState,
          disabled: !approved || earnings == 0,
          earnings,
        }));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const getStakedTokens = async () => {
    if (walletConnection.contracts[smartContract]) {
      const result = await walletConnection.contracts[stakingSmartContract].userInfo(0, wallet.account).call();
      const poolStaking = bnToNumber(result[poolId]).toString();

      setStakedToken((prevState) => ({
        ...prevState,
        disabled: false,
        earnings: poolStaking,
        empty: parseFloat(poolStaking) === 0,
      }));
    }
  };

  const onEnable = async () => {
    setLoadingApprove(true);

    const result = await walletConnection.contracts[smartContract].approve(walletConnection.contracts[stakingSmartContract].address, '115792089237316195423570985008687907853269984665640564039457584007913129639935').send({ from: wallet.account }).on('receipt', () => {
      setApproved(result.status);
    }).catch((e) => {
      console.error(e);
    });

    setLoadingApprove(false);
  };

  const onStake = async (amount) => {
    setLoadingStaking(true);

    const result = await walletConnection.contracts[stakingSmartContract].enterStaking(numberToBN(amount).toString()).send({
      from: wallet.account,
    }).on('receipt', () => {
      getStakedTokens();
      updateBalance();
      hideStakeModal();
    }).catch((e) => {
      console.error(e);
    });

    setLoadingStaking(false);
  };

  const onUnstake = async (amount) => {
    setLoadingUnstaking(true);

    const result = await walletConnection.contracts[stakingSmartContract].leaveStaking(numberToBN(amount).toString()).send({
      from: wallet.account,
    }).on('receipt', () => {
      getStakedTokens();
      updateBalance();
      hideUnstakeModal();
    }).catch((e) => {
      console.error(e);
    });

    setLoadingUnstaking(false);
  };

  const updateBalance = async () => {
    if (!walletConnection.contracts[smartContract]) return;

    try {
      const result = await walletConnection.contracts[smartContract].balanceOf(wallet.account).call();

      setBalance(result);
    } catch (e) {
      console.error(e);
    }
  };

  const displayStakeModal = () => {
    setLoadingStaking(false);
    setShowStakeModal(true);
  };

  const hideStakeModal = () => {
    setShowStakeModal(false);
  };

  const displayUnstakeModal = () => {
    setLoadingUnstaking(false);
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
        await updateBalance();
      }
    }
  }, [wallet.networkId, wallet.account]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (wallet.networkId && wallet.account) {
        await getEarnedTokens();
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <PoolCard
        approved={approved}
        canUnstake={stakedToken.earnings > 0}
        loading={loadingApprove}
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
        loading={loadingStaking}
        token={token}
        show={showStakeModal}
        onHide={hideStakeModal}
        onStake={onStake}
        onBuy={() => console.log('TODO: onBuy')}
      />
      <UnstakeTokenModal
        balance={balance}
        loading={loadingUnstaking}
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
