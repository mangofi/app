import React from 'react';
import PropTypes from 'prop-types';

import * as Styles from './styles';

const SidebarMenu = ({ className, children }) => (
  <Styles.Container className={`list-unstyled ${className}`}>
    {children}
  </Styles.Container>
);

SidebarMenu.propTypes = {
  children: PropTypes.element,
};

SidebarMenu.defaultProps = {
  children: null,
};

export default SidebarMenu;
