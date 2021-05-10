import React, {
  useCallback, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Button from 'components/atoms/button';
import { TokenBalance } from 'components/atoms/card';

import Coin from 'components/molecules/coin';

import * as Styles from './styles';

const PoolCard = ({
  token, verified, apr, tokenEarnings, canUnstake, approved, onEnable, onStake, onUnstake,
}) => {
  const renderVerified = useCallback(() => {
    if (verified) {
      return (
        <Styles.VerifiedIconContainer>
          <FontAwesomeIcon className="fa-xs" icon={faCheckCircle} fixedWidth />
        </Styles.VerifiedIconContainer>
      );
    }
    return null;
  }, [verified]);

  const renderApr = useCallback(() => {
    if (apr) {
      return (
        <div>
          APR
          {' '}
          {apr}
        </div>
      );
    }
    return null;
  }, [apr]);

  const stakeTitle = useMemo(() => (canUnstake ? 'Unstake' : `Stake ${token}`), [canUnstake]);

  const renderEarnings = useCallback(() => tokenEarnings.map(({
    earnings, usdEarnings, token: earningsToken, empty, staked, onClick,
  }) => (
    <TokenBalance
      title={`${earningsToken} ${staked ? 'Staked' : 'Earned'}`}
      actions={!empty && [
        <Button
          fixedWidth
          secondary={!staked}
          flat
          disabled={!approved}
          onClick={onClick}
        >
          {staked ? 'Stake' : 'Collect'}
        </Button>,
      ]}
      earnings={!empty && earnings}
      usdEarnings={!empty && usdEarnings}
    />
  )));

  return (
    <Styles.StyledCard coin={<Coin name={token} />}>
      <small className="d-flex flex-fill flex-row justify-content-end text-right">
        <a href="#">View details</a>
      </small>
      <div className="d-flex flex-fill flex-column mt-2">
        <div className="d-flex flex-fill flex-row align-items-space-between">
          <h6 className="d-flex flex-fill flex-row bold">
            {token}
            {' '}
            Pool
            {renderVerified()}
          </h6>
          {renderApr()}
        </div>
        <Styles.EarningsContainer className="d-flex flex-fill flex-column mt-3">
          {renderEarnings()}
        </Styles.EarningsContainer>
        <div>
          <Button flat secondary={approved && canUnstake} block onClick={approved ? (canUnstake ? onUnstake : onStake) : onEnable}>
            {approved ? stakeTitle : 'Enable'}
          </Button>
        </div>
      </div>
    </Styles.StyledCard>
  );
};

PoolCard.propTypes = {
  token: PropTypes.string.isRequired,
  verified: PropTypes.bool,
  apr: PropTypes.string,
  tokenEarnings: PropTypes.any,
  canUnstake: PropTypes.bool,
  approved: PropTypes.bool,
  onEnable: PropTypes.func,
  onStake: PropTypes.func,
  onUnstake: PropTypes.func,
};

PoolCard.defaultProps = {
  verified: false,
  apr: null,
  tokenEarnings: [],
  canUnstake: false,
  approved: false,
  onEnable: () => {},
  onStake: () => {},
  onUnstake: () => {},
};

export default PoolCard;
