import React from 'react';
import PropTypes from 'prop-types';

import * as Styles from './styles';

const TokenBalance = ({
  title, actions, earnings, usdEarnings,
}) => (
  <Styles.Container>
    <div className="d-flex flex-fill flex-row justify-content-end">
      <div className="d-flex flex-fill flex-column justify-content-end">
        <p className="m-0">
          {title}
        </p>
        {earnings != null ? <h4>{earnings}</h4> : null}
        {usdEarnings ? (
          <small className="text-gray">
            {usdEarnings}
            {' '}
            USD
          </small>
        ) : null}
      </div>
      {actions ? (
        <div className="d-flex flex-column justify-content-center">
          {actions}
        </div>
      ) : null}
    </div>
  </Styles.Container>
);

TokenBalance.propTypes = {
  title: PropTypes.string.isRequired,
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
