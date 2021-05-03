import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Button from '../../atoms/button';
import { TokenBalance } from '../../atoms/card';

import Coin from '../coin';
import { MNGO } from '../coin/constants';

import * as Styles from './styles';

const PoolCard = ({
  token, verified, apr, approved, tokenEarnings,
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

  const renderEarnings = useCallback(() => tokenEarnings.map(({ earnings, usdEarnings, token }) => (
    <TokenBalance
      token={token}
      actions={[<Button secondary flat disabled={!approved}>Collect</Button>]}
      earnings={earnings}
      usdEarnings={usdEarnings}
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
          <Button block>
            Enable
          </Button>
        </div>
      </div>
    </Styles.StyledCard>
  );
};

PoolCard.propTypes = {
  token: PropTypes.string,
  verified: PropTypes.bool,
  apr: PropTypes.string,
  approved: PropTypes.bool,
  tokenEarnings: PropTypes.any,
};

PoolCard.defaultProps = {
  token: MNGO,
  verified: false,
  apr: null,
  approved: false,
  tokenEarnings: [],
};

export default PoolCard;
