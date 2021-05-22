import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import * as Styles from './styles';

import { COINS_URL, MEDIUM, SMALL } from './constants';

const Coin = ({
  className, name, subToken, small,
}) => {
  const coinUrl = useMemo(() => `${small ? COINS_URL[SMALL][name] : COINS_URL[MEDIUM][name]}`, [name]);
  const subTokenUrl = useMemo(() => `${small ? COINS_URL[SMALL][subToken] : COINS_URL[MEDIUM][subToken]}`, [subToken]);

  const renderSubCoin = useCallback(() => {
    if (subToken) {
      return (
        <Styles.SubCoinContainer>
          <Styles.Image src={subTokenUrl} small />
        </Styles.SubCoinContainer>
      );
    }
  }, [subToken]);

  return (
    <Styles.Container className={className}>
      <Styles.Image src={coinUrl} />
      {renderSubCoin()}
    </Styles.Container>
  );
};

Coin.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.bool,
  subToken: PropTypes.string,
};

Coin.defaultProps = {
  className: null,
  small: false,
  subToken: null,
};

export default Coin;
