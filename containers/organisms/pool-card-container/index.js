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
import CollectModal from 'components/organisms/collect-modal';
import DetailsModal from 'components/organisms/details-modal';

import connector from 'lib/connector';
import { WalletConnectionContext } from 'lib/wallet-connection';

import {
  numberToBN, bnToNumber, add, asBN,
} from 'utils/number';

const PoolCardContainer = ({
  token, smartContract, stakingSmartContract, verified, wallet, poolId, walletActions,
}) => {
  const walletConnection = useContext(WalletConnectionContext);
  const [apr, setApr] = useState(null);
  const [totalStaked, setTotalStaked] = useState(0);
  const [approved, setApproved] = useState(false);
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [showUnstakeModal, setShowUnstakeModal] = useState(false);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loadingStaking, setLoadingStaking] = useState(false);
  const [loadingUnstaking, setLoadingUnstaking] = useState(false);
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [loadingCollect, setLoadingCollect] = useState(false);
  const [loadingTotalStaked, setLoadingTotalStaked] = useState(false);

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
        const earnings = bnToNumber(result);

        setEarnedToken((prevState) => ({
          ...prevState,
          disabled: earnings.eq(0),
          earnings: earnings.toString(),
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
      updateStakedTokenBalance();
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
      updateStakedTokenBalance();
      hideUnstakeModal();
    }).catch((e) => {
      console.error(e);
    });

    setLoadingUnstaking(false);
  };

  const updateStakedTokenBalance = async () => {
    if (!walletConnection.contracts[smartContract]) return;

    try {
      const result = await walletConnection.contracts[smartContract].balanceOf(wallet.account).call();

      walletActions.setBalance(token, result);
    } catch (e) {
      console.error(e);
    }
  };

  const updateTotalStaked = async () => {
    if (!walletConnection.contracts[smartContract]) return;
    setLoadingTotalStaked(true);

    try {
      const result = await walletConnection.contracts[smartContract].balanceOf(walletConnection.contracts[stakingSmartContract].address).call();

      setTotalStaked(result);
    } catch (e) {
      console.error(e);
    }

    setLoadingTotalStaked(false);
  };

  const onHarvest = async () => {
    setLoadingCollect(true);

    await walletConnection.contracts[stakingSmartContract].leaveStaking('0').send({
      from: wallet.account,
    }).on('receipt', () => {
      getEarnedTokens();
      getStakedTokens();
      updateStakedTokenBalance();
      hideCollectModal();
    }).catch((e) => {
      console.error(e);
    });

    setLoadingCollect(false);
  };

  const onCompound = async () => {
    setLoadingCollect(true);

    await walletConnection.contracts[stakingSmartContract].enterStaking(numberToBN(earnedToken.earnings).toString()).send({
      from: wallet.account,
    }).on('receipt', () => {
      getEarnedTokens();
      getStakedTokens();
      updateStakedTokenBalance();
      hideCollectModal();
    }).catch((e) => {
      console.error(e);
    });

    setLoadingCollect(false);
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

  const displayCollectModal = () => {
    setLoadingCollect(false);
    setShowCollectModal(true);
  };

  const hideCollectModal = () => {
    setShowCollectModal(false);
  };

  const displayDetailsModal = () => {
    updateTotalStaked();
    setShowDetailsModal(true);
  };

  const hideDetailsModal = () => {
    setShowDetailsModal(false);
  };

  const [stakedToken, setStakedToken] = useState({
    earnings: 0.0,
    disabled: !approved,
    usdEarnings: '~0.000',
    empty: true,
    token,
    staked: true,
    onTokenBalanceClick: displayStakeModal,
  });
  const [earnedToken, setEarnedToken] = useState({
    earnings: 0.0,
    disabled: !approved,
    usdEarnings: '~0.000',
    empty: false,
    token,
    staked: false,
    onTokenBalanceClick: displayCollectModal,
  });

  useEffect(async () => {
    if (wallet.networkId) {
      await checkTokenAllowance();

      if (wallet.account) {
        await getEarnedTokens();
        await getStakedTokens();
        await updateStakedTokenBalance();
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
        tokenEarnings={[
          {
            ...earnedToken,
            earnings: asBN(earnedToken.earnings).toFormat(),
          },
          {
            ...stakedToken,
            earnings: asBN(stakedToken.earnings).toFormat(),
          },
        ]}
        onEnable={onEnable}
        onStake={displayStakeModal}
        onUnstake={displayUnstakeModal}
        onViewDetails={displayDetailsModal}
      />
      <StakeTokenModal
        balance={wallet.balances[token]}
        loading={loadingStaking}
        token={token}
        show={showStakeModal}
        onHide={hideStakeModal}
        onStake={onStake}
        onBuy={() => console.log('TODO: onBuy')}
      />
      <UnstakeTokenModal
        balance={numberToBN(stakedToken.earnings)}
        loading={loadingUnstaking}
        token={token}
        show={showUnstakeModal}
        onHide={hideUnstakeModal}
        onUnstake={onUnstake}
      />
      <CollectModal
        initialEarnings={numberToBN(earnedToken.earnings)}
        loading={loadingCollect}
        newStakedBalance={add(numberToBN(stakedToken.earnings), numberToBN(earnedToken.earnings))}
        token={token}
        show={showCollectModal}
        onHide={hideCollectModal}
        onHarvest={onHarvest}
        onCompound={onCompound}
      />
      <DetailsModal
        show={showDetailsModal}
        totalStaked={totalStaked}
        loading={loadingTotalStaked}
        contractUrl={`https://${process.env.NEXT_PUBLIC_APP_ENV !== 'production' ? 'testnet.' : ''}bscscan.com/address/${walletConnection.contracts[stakingSmartContract]?.address}`}
        onHide={hideDetailsModal}
        token={token}
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
