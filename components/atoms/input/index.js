import React from 'react';
import { InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

import * as Styles from './styles';

const Input = ({
  suffix, isInvalid, className, ...rest
}) => {
  if (suffix) {
    return (
      <Styles.Container>
        <Styles.Input className={className} isInvalid={isInvalid} {...rest} />
        <Styles.TokenName isInvalid={isInvalid}>{suffix}</Styles.TokenName>
      </Styles.Container>
    );
  }
  return (
    <Styles.Input className={className} {...rest} />
  );
};

Input.propTypes = {
  suffix: PropTypes.element,
  isInvalid: PropTypes.bool,
  className: PropTypes.string,
};

Input.defaultProps = {
  suffix: null,
  isInvalid: false,
  className: null,
};

export default Input;
