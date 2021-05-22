import React from 'react';
import { InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

import * as Styles from './styles';

const Input = ({
  suffix, isInvalid, className, onEnterPressed, ...rest
}) => {
  const onKeyPress = (event) => {
    if (event.key === 'Enter') onEnterPressed(event);
  };

  if (suffix) {
    return (
      <Styles.Container>
        <Styles.Input className={className} isInvalid={isInvalid} onKeyPress={onKeyPress} {...rest} />
        <Styles.TokenName isInvalid={isInvalid}>{suffix}</Styles.TokenName>
      </Styles.Container>
    );
  }
  return (
    <Styles.Input className={className} onKeyPress={onKeyPress} {...rest} />
  );
};

Input.propTypes = {
  suffix: PropTypes.element,
  isInvalid: PropTypes.bool,
  className: PropTypes.string,
  onEnterPressed: PropTypes.func,
};

Input.defaultProps = {
  suffix: null,
  isInvalid: false,
  className: null,
  onEnterPressed: () => {},
};

export default Input;
