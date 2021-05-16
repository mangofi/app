import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import * as Styles from './styles';

const Card = ({
  className, children, token, subToken,
}) => {
  const renderCoin = useCallback(() => {
    if (token) {
      return (
        <Styles.IconContainer>
          <Styles.StyledCoin name={token} subToken={subToken} />
        </Styles.IconContainer>
      );
    }
    return null;
  }, [token]);

  return (
    <Styles.Container className={className}>
      {renderCoin()}
      {children}
    </Styles.Container>
  );
};

Card.propTypes = {
  token: PropTypes.string,
  subToken: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.element,
};

Card.defaultProps = {
  className: null,
  token: null,
  subToken: null,
  children: null,
};

export default Card;
