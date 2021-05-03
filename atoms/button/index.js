import React from 'react';
import PropTypes from 'prop-types';

import * as Styles from './styles';

const Button = ({
  children, small, secondary, flat, fixedWidth, icon, ...props
}) => (
  <Styles.Container fixedWidth={fixedWidth} small={small} secondary={secondary} flat={flat} {...props}>
    {children}
    {' '}
    {icon}
  </Styles.Container>
);

Button.propTypes = {
  children: PropTypes.element,
  small: PropTypes.bool,
  secondary: PropTypes.bool,
  flat: PropTypes.bool,
  fixedWidth: PropTypes.bool,
  icon: PropTypes.element,
};

Button.defaultProps = {
  children: null,
  small: false,
  secondary: false,
  flat: false,
  fixedWidth: false,
  icon: null,
};

export default Button;
