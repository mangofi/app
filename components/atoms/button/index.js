import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as Styles from './styles';

const Button = ({
  children, className, small, secondary, flat, fixedWidth, icon, loading, onClick, ...props
}) => (
  <Styles.Container className={className} fixedWidth={fixedWidth} small={small} secondary={secondary} flat={flat} onClick={onClick || (() => {})} {...props}>
    {children}
    {' '}
    {loading ? (
      <Styles.SpinnerContainer className="ml-2">
        <CircularProgress />
      </Styles.SpinnerContainer>
    ) : icon}
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
  small: false,
  secondary: false,
};

export default Button;
