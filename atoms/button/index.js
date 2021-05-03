import React from 'react';
import PropTypes from 'prop-types';

import * as Styles from './styles';

const Button = ({
  children, small, icon, ...props
}) => (
  <Styles.Container small={small} {...props}>
    {children}
  </Styles.Container>
);

Button.propTypes = {
  children: PropTypes.element,
  small: PropTypes.bool,
};

Button.defaultProps = {
  children: null,
  small: false,
};

export default Button;
