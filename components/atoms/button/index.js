import React from 'react';
import PropTypes from 'prop-types';

import * as Styles from './styles';

const Button = ({
  children, className, small, secondary, flat, fixedWidth, icon, ...props
}) => (
  <Styles.Container className={className} fixedWidth={fixedWidth} small={small} secondary={secondary} flat={flat} {...props}>
    {children}
    {' '}
    {icon}
  </Styles.Container>
);

Button.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  flat: PropTypes.bool,
  fixedWidth: PropTypes.number,
  grayedOut: PropTypes.bool,
  icon: PropTypes.element,
  small: PropTypes.bool,
  secondary: PropTypes.bool,
};

Button.defaultProps = {
  children: null,
  className: null,
  flat: false,
  fixedWidth: null,
  grayedOut: false,
  icon: null,
  small: false,
  secondary: false,
};

export default Button;
