import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ className }) => (
  <img
    alt="mango logo"
    className={className}
    src="/img/logo.svg"
    width={46}
    height={46}
  />
);

Logo.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Logo;
