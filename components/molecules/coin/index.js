import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import * as Styles from './styles';

import * as Constants from './constants';

const Coin = ({ name, subCoin }) => {
  const coinUrl = useMemo(() => `${Constants.COINS_URL[name]}`, [name]);
  const subCoinUrl = useMemo(() => `${Constants.COINS_URL[subCoin]}`, [subCoin]);

  const renderSubCoin = useCallback(() => {
    if (subCoin) {
      return (
        <Styles.SubCoinContainer>
          <Styles.Image src={subCoinUrl} small />
        </Styles.SubCoinContainer>
      );
    }
  }, [subCoin]);

  return (
    <Styles.Container>
      <Styles.Image src={coinUrl} />
      {renderSubCoin()}
    </Styles.Container>
  );
};

Coin.propTypes = {
  name: PropTypes.string.isRequired,
  subCoin: PropTypes.string,
};

Coin.defaultProps = {
  subCoin: null,
};

export default Coin;
