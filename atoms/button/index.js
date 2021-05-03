import React from 'react';
import PropTypes from 'prop-types';

import * as Styles from './styles';

const Button = ({
  children, small, secondary, flat, icon, ...props
}) => (
  <Styles.Container small={small} secondary={secondary} flat={flat} {...props}>
    {children}
  </Styles.Container>
);

Button.propTypes = {
  children: PropTypes.element,
  small: PropTypes.bool,
  secondary: PropTypes.bool,
  flat: PropTypes.bool,
};

Button.defaultProps = {
  children: null,
  small: false,
  secondary: false,
  flat: false,
};

export default Button;
