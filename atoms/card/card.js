import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import * as Styles from './styles';

const Card = ({ className, children, coin }) => {
  const renderCoin = useCallback(() => {
    if (coin) {
      return (
        <Styles.IconContainer>
          {coin}
        </Styles.IconContainer>
      );
    }
    return null;
  }, [coin]);

  return (
    <Styles.Container className={className}>
      {renderCoin()}
      {children}
    </Styles.Container>
  );
};

Card.propTypes = {
  coin: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.element,
};

Card.defaultProps = {
  className: null,
  coin: null,
  children: null,
};

export default Card;
