import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as Styles from './styles';

const Button = ({
  children, className, small, secondary, flat, fixedWidth, leftIcon, icon, loading, onClick, ...props
}) => (
  <Styles.Container className={className} fixedWidth={fixedWidth} small={small} secondary={secondary} flat={flat} onClick={onClick || (() => {})} {...props}>
    {leftIcon}
    {' '}
    {children}
    {' '}
    {icon}
    {' '}
    {loading ? (
      <Styles.SpinnerContainer className="ml-2">
        <CircularProgress />
      </Styles.SpinnerContainer>
    ) : null}
  </Styles.Container>
);

Button.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  flat: PropTypes.bool,
  fixedWidth: PropTypes.number,
  loading: PropTypes.bool,
  grayedOut: PropTypes.bool,
  icon: PropTypes.element,
  leftIcon: PropTypes.element,
  small: PropTypes.bool,
  secondary: PropTypes.bool,
};

Button.defaultProps = {
  children: null,
  className: null,
  flat: false,
  fixedWidth: null,
  grayedOut: false,
  loading: false,
  icon: null,
  leftIcon: null,
  small: false,
  secondary: false,
};

export default Button;
