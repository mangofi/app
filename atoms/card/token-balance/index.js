import React from 'react';
import PropTypes from 'prop-types';

import * as Styles from './styles';

const TokenBalance = ({
  token, actions, earnings, usdEarnings,
}) => (
  <Styles.Container>
    <div className="d-flex flex-fill flex-row justify-content-end">
      <div className="d-flex flex-fill flex-column">
        <p className="m-0">
          {token}
          {' '}
          Earned
        </p>
        <h4>{earnings}</h4>
        <small className="text-gray">
          {usdEarnings}
          {' '}
          USD
        </small>
      </div>
      <div className="d-flex flex-column justify-content-center">
        {actions}
      </div>
    </div>
  </Styles.Container>
);

TokenBalance.propTypes = {
  token: PropTypes.string.isRequired,
  actions: PropTypes.element,
  earnings: PropTypes.string,
  usdEarnings: PropTypes.string,
};

TokenBalance.defaultProps = {
  actions: null,
  earnings: '0.000',
  usdEarnings: '~0.000',
};

export default TokenBalance;
