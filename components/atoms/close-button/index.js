import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import * as Styles from './styles';

const CloseButton = ({ children, disabled, onClick }) => (
  <Styles.Button disabled={disabled} onClick={onClick}>
    <FontAwesomeIcon icon={faTimes} fixedWidth />
  </Styles.Button>
);

CloseButton.propTypes = {
  children: PropTypes.element,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

CloseButton.defaultProps = {
  children: null,
  onClick: () => {},
  disabled: false,
};

export default CloseButton;
